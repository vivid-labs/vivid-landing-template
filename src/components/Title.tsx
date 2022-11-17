import { DetailedHTMLProps, HTMLAttributes } from "react";

// Built with Vivid ⚡️

export const Title = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & { size: "lg" | "md" }
) => {
  const { size, className = "", ...otherProps } = props;

  const headingProps = {
    ...otherProps,
    "data-aos": "zoom-y-out",
  };

  return size === "lg" ? (
    <h1
      {...headingProps}
      className={`font-bold leading-tight tracking-tighter title-lg ${className}`}
    />
  ) : (
    <h2
      {...headingProps}
      className={`font-bold leading-tight tracking-tighter title-md ${className}`}
    />
  );
};
