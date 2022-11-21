import Image from "next/image";
import { LinkButton } from "../components/LinkButton";

// Built with Vivid (https://vivid.lol) ⚡️

export const Footer = () => {
  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between px-10 py-4 mx-auto sm:px-6 row max-w-7xl">
        <div className="items-center gap-4 row">
          <Image
            src="/images/logo.png"
            alt="Vivid Logo"
            height="40"
            width="40"
          />
          <div className="text-sm text-light">&copy; Vivid Labs, Inc. 2022</div>
        </div>
        <LinkButton
          href="https://join.slack.com/t/vivid-jqa6824/shared_invite/zt-1f7tbxl86-wruO1aM7FYmEdNaOOnYCMQ"
          aria-label="Join Slack"
        >
          Join our Slack!
        </LinkButton>
      </div>
    </footer>
  );
};
