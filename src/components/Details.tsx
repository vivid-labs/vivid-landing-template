import { DetailedHTMLProps, HTMLAttributes } from "react";

// Built with Vivid ⚡️

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
      className={`body-lg text-light ${props.className ?? ""}`}
    />
  );
};
