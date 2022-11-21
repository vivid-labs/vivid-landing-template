import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Demo } from "../components/Demo";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

// Built with Vivid (https://vivid.lol) ⚡️

const FeatureSection = ({
  children,
  grayer,
  right,
  center,
}: {
  children: ReactNode;
  grayer?: boolean;
  right?: boolean;
  center?: boolean;
}) => (
  <Section
    grayer={grayer}
    fullWidth
    className={`col items-center ${
      center ? "" : right ? "md:flex-row-reverse" : "md:flex-row"
    }`}
  >
    {children}
  </Section>
);

const FeatureDemo = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    webmSrc: string;
    mp4Src: string;
    bumpLeft?: boolean;
    center?: boolean;
    className: string;
    alt: string;
  }
) => {
  const { webmSrc, mp4Src, bumpLeft, center, alt, className, ...divProps } =
    props;
  return (
    <div
      {...divProps}
      className={twMerge(
        `w-5/6 md:w-1/2 p-4 md:p-12 bg-gradient-to-br rounded-xl ${
          center ? "" : bumpLeft ? "md:-translate-x-14" : "md:translate-x-14"
        }`,
        className
      )}
    >
      <Demo
        data-aos={`${
          center ? "zoom-y-out" : bumpLeft ? "fade-right" : "fade-left"
        }`}
        data-aos-delay="300"
        webmSrc={webmSrc}
        mp4Src={mp4Src}
        alt={alt}
      />
    </div>
  );
};

const Text = ({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) => (
  <div
    className={`w-5/6 col gap-4 text-center mb-8 mx-auto ${
      center ? "md:w-2/3" : "md:w-2/5 md:text-left md:my-auto"
    }`}
  >
    {children}
  </div>
);

export const Features = () => {
  return (
    <>
      {/* Feature 1 */}
      <FeatureSection grayer center>
        <Text center>
          <Title size="md">
            <GradientText className="amber-red">
              &quot;Just right&quot;
            </GradientText>{" "}
            in seconds.
          </Title>
          <Details>Test styling and update code right in your browser.</Details>
        </Text>
        <FeatureDemo
          webmSrc="/videos/palette.webm"
          mp4Src="/videos/palette.mp4"
          center
          className="amber-red"
          alt="A video showing Vivid's command palette functionality. The user iterates through previewed styles and applies one."
        />
      </FeatureSection>
      {/* Feature 2 */}
      <FeatureSection right>
        <Text>
          <Title size="md">
            <GradientText className="pink-blue">Resize</GradientText>
            <br /> with a click.
          </Title>
          <Details>Just drag to resize and realign components.</Details>
        </Text>
        <FeatureDemo
          webmSrc="/videos/resize.webm"
          mp4Src="/videos/resize.mp4"
          bumpLeft
          className="pink-blue"
          alt="A video showing Vivid's mouse resizing functionality. By dragging with a mouse, the user resizes a component."
        />
      </FeatureSection>
      {/* Feature 3 */}
      <FeatureSection grayer>
        <Text>
          <Title size="md">
            <GradientText className="green-sky">Smart commands</GradientText>
            <br /> cut the guesswork.
          </Title>
          <Details>
            Vivid smart commands apply the right styles every time.
          </Details>
        </Text>
        <FeatureDemo
          webmSrc="/videos/center.webm"
          mp4Src="/videos/center.mp4"
          className="green-sky"
          alt="A video showing Vivid's smart command functionality. By typing smart-center, the user centers all content on screen."
        />
      </FeatureSection>
    </>
  );
};
