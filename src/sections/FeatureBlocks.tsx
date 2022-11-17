import { ReactNode } from "react";

import {
  CardsIcon,
  MagicIcon,
  DoorIcon,
  ShuffleIcon,
  SignalIcon,
  TalkingIcon,
} from "../svg/FeatureIcons";
import { Card } from "../components/Card";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

// Built with Vivid (https://vivid.lol) ⚡️

const BlockTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-xl font-bold text-strong">{children}</h3>;
};

const BlockText = ({ children }: { children: ReactNode }) => {
  return <p className="text-light">{children}</p>;
};

const Block = ({ children }: { children: ReactNode }) => {
  return (
    <Card grayer className="items-center gap-1 p-6 col">
      {children}
    </Card>
  );
};

export const FeatureBlocks = () => {
  return (
    <Section className="gap-16 text-center">
      {/* Header */}
      <div className="gap-4 col">
        <Title size="md">
          Make styling a{" "}
          <GradientText className="purple-teal">breeze</GradientText>
        </Title>
        <Details>
          Stop wasting your time. Vivid makes CSS easier than recursive
          depth-first search.
        </Details>
      </div>
      {/* Blocks */}
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* Block 1 */}
        <Block>
          <ShuffleIcon />
          <BlockTitle>In-browser</BlockTitle>
          <BlockText>
            Edit your styling from the most natural place — where it renders
          </BlockText>
        </Block>
        {/* Block 2 */}
        <Block>
          <SignalIcon />
          <BlockTitle>Code first</BlockTitle>
          <BlockText>
            Use Vivid&apos;s command palette and code pane to edit styling using
            code
          </BlockText>
        </Block>
        {/* Block 3 */}
        <Block>
          <TalkingIcon />
          <BlockTitle>Modern frameworks</BlockTitle>
          <BlockText>
            Build components using Vivid in React styled with Tailwind CSS
          </BlockText>
        </Block>
        {/* Block 4 */}
        <Block>
          <DoorIcon />
          <BlockTitle>Production-ready code</BlockTitle>
          <BlockText>
            Modify your styling in-browser and update your IDE with code that
            looks like your own
          </BlockText>
        </Block>
        {/* Block 5 */}
        <Block>
          <CardsIcon />
          <BlockTitle>Your workflow</BlockTitle>
          <BlockText>
            Keep using your browser and IDE without needing an extra window
          </BlockText>
        </Block>
        {/* Block 6 */}
        <Block>
          <MagicIcon />
          <BlockTitle>Smarter inspect element</BlockTitle>
          <BlockText>
            Understand and modify the components making up your design with just
            one click
          </BlockText>
        </Block>
      </div>
    </Section>
  );
};
