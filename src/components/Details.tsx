import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Built with Vivid (https://vivid.lol) ⚡️

export const Details = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => {
  return (
    <p
      {...props}
      data-aos="zoom-y-out"
      data-aos-delay="150"
      className={twMerge("body-lg text-light", props.className)}
    />
  );
};
