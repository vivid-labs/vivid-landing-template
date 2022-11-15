import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// Built with Vivid ⚡️

export const LinkButton = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      type="button"
      {...props}
      className={`text-light hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ${
        props.className ?? ""
      }`}
    />
  );
};
