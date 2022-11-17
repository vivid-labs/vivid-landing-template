import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Built with Vivid (https://vivid.lol) ⚡️

export const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      {...props}
      className={twMerge(
        "px-4 py-3 border rounded-lg placeholder-gray-400 dark:placeholder-gray-600 bg-strong first-line:border-gray-200 dark:border-gray-600 text-strong",
        props.className
      )}
    />
  );
};
