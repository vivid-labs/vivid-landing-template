import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Built with Vivid (https://vivid.lol) ⚡️

export const Card = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    grayer?: boolean;
    dark?: boolean;
  }
) => {
  const { grayer = false, dark = false, ...divProps } = props;

  const bgClasses = `${
    dark ? "bg-gray-900" : grayer ? "bg-strong" : "bg-extra-strong"
  }`;

  return (
    <div
      {...divProps}
      className={twMerge(
        `relative shadow-xl flex-1 border border-gray-300 rounded-lg dark:border-gray-600 ${bgClasses}`,
        props.className
      )}
    />
  );
};
