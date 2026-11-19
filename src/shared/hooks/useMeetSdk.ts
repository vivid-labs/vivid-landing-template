import { create } from "zustand";
import {
  meet,
  type MeetingInfo,
  type MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";
import { useEffect } from "react";

// Your Google Cloud Project Number (from Google Cloud Console)
const CLOUD_PROJECT_NUMBER = "464731456038";

type MeetSdkStore = {
  sidePanelClient: MeetSidePanelClient | null;
  setSidePanelClient: (client: MeetSidePanelClient | null) => void;
  meetingDetails: MeetingInfo | null;
  setMeetingDetails: (details: MeetingInfo | null) => void;
  clear: () => void;
};

export const useMeetStore = create<MeetSdkStore>()((set) => ({
  sidePanelClient: null,
  setSidePanelClient: (client) => set({ sidePanelClient: client }),
  meetingDetails: null,
  setMeetingDetails: (details) => set({ meetingDetails: details }),
  clear: () => set({ sidePanelClient: null }),
}));

const useMeetSdk = () => {
  const meetingDetails = useMeetStore((s) => s.meetingDetails);
  const setMeetingDetails = useMeetStore((s) => s.setMeetingDetails);
  const sidePanelClient = useMeetStore((s) => s.sidePanelClient);
  const setSidePanelClient = useMeetStore((s) => s.setSidePanelClient);
  // Initialize Google Meet Add-on SDK only if meet_sdk param is present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("meet_sdk")) {
      // Don't initialize SDK if not running in Meet Add-on context
      return;
    }
    async function initMeetAddon() {
      // If we've already initialized the client or meeting details, skip
      if (
        useMeetStore.getState().sidePanelClient ||
        useMeetStore.getState().meetingDetails
      ) {
        console.log(
          "[Better Chat Add-on] Meet SDK already initialized, skipping init"
        );
        return;
      }
      try {
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER,
        });
        const client = await session.createSidePanelClient();
        const details = await client.getMeetingInfo();
        setMeetingDetails(details);

        // Store client in zustand store for use in other components
        setSidePanelClient(client);

        console.log("[Better Chat Add-on] Meet SDK initialized successfully");
      } catch (error) {
        console.error("[Better Chat Add-on] Failed to initialize Meet SDK:", error);
        // SDK initialization failure is not critical - addon can still work with extension
      }
    }
    initMeetAddon();

    return () => {
      // Clear the stored client and meeting details when unmounting
      useMeetStore.getState().clear();
      useMeetStore.getState().setMeetingDetails(null);
    };
  }, []);

  // Notify other participants via Meet SDK when a new message appears
  const startActivity = async () => {
    if (!sidePanelClient) {
      console.warn(
        "[Better Chat Add-on] startActivity called but sidePanelClient is not initialized"
      );
      return;
    }

    try {
      const activityState = await sidePanelClient.getActivityStartingState();
      if (activityState.additionalData) {
        return;
      }
      const res = await sidePanelClient.startActivity({
        sidePanelUrl: "https://better-chat.vercel.app/sidepanel",
        additionalData: JSON.stringify({
          type: "new_chat_message",
        }),
      });
      console.log("[Better Chat Add-on] Notified participants of new message", res);
      return res;
    } catch (error) {
      console.error("[Better Chat Add-on] Failed to notify activity:", error);
      throw error;
    }
  };
  return { meetingDetails, sidePanelClient, startActivity };
};

export default useMeetSdk;
