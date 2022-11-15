import { DetailedHTMLProps, HTMLAttributes } from "react";

// Built with Vivid ⚡️

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
      className={`relative shadow-xl flex-1 border border-gray-300 rounded-lg dark:border-gray-600 ${bgClasses} ${
        props.className ?? ""
      }`}
    />
  );
};
