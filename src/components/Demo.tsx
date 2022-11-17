import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { MacBar } from "./MacBar";

// Built with Vivid (https://vivid.lol) ⚡️

type DemoProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  webmSrc: string;
  mp4Src: string;
  alt: string;
};

export const Demo = (props: DemoProps) => {
  const { webmSrc, mp4Src, alt, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={twMerge(
        "relative col w-full justify-center max-w-2xl overflow-hidden shadow-lg round-rect",
        divProps.className
      )}
    >
      <MacBar />
      <video autoPlay loop muted playsInline aria-label={alt} tabIndex={-1}>
        {/* Need both for Safari compatibility */}
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
};
