import Image from "next/image";

import MacBarSrc from "../images/mac-bar.png";

// Built with Vivid (https://vivid.lol) ⚡️

export const MacBar = () => {
  // Need rounding here too for Safari
  return (
    <Image src={MacBarSrc} className="round-rect-top" alt="Mac window bar" />
  );
};
