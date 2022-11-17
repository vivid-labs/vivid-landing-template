import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

// Built with Vivid (https://vivid.lol) ⚡️

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button
    type="button"
    {...props}
    className={twMerge(
      "text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-fit px-4 py-2",
      props.className
    )}
  />
);
