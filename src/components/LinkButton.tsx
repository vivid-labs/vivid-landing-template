import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";

// Built with Vivid (https://vivid.lol) ⚡️

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/**
 * A link that subtly looks like a button
 * @param props HTML props along with `button` if the tag should be a button instead of anchor tag
 */
export const LinkButton = (
  props: (LinkProps & { button?: undefined }) | (ButtonProps & { button: true })
) => {
  const { button, className = "", ...htmlProps } = props;

  return button ? (
    <button
      type="button"
      {...(htmlProps as ButtonProps)}
      className={`text-light hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ${className}`}
    />
  ) : (
    <a
      {...(htmlProps as LinkProps)}
      className={`text-light hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ${className}`}
    />
  );
};
