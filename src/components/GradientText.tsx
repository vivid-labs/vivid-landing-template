import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { Gradient } from "../types/Gradient.type";
import { getGradientColors } from "../utils/getGradientColors";

// Built with Vivid (https://vivid.lol) ⚡️

export const GradientText = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
    gradient: Gradient;
  }
) => {
  const { className = "", children } = props;

  const { gradient, ...spanProps } = props;

  return (
    <span
      {...spanProps}
      className={twMerge(
        `bg-text bg-gradient-to-r ${getGradientColors(gradient)}`,
        className
      )}
    >
      {children}
    </span>
  );
};
