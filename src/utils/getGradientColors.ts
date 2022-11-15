import { Gradient } from "../types/Gradient.type";

export const getGradientColors = (gradient: Gradient) => {
  const map: { [Property in Gradient]: string } = {
    "pink-blue": "from-neon-pink to-neon-blue",
    "amber-red": "from-neon-amber to-neon-red",
    "green-sky": "from-neon-green to-neon-sky",
    "purple-teal": "from-neon-purple to-neon-teal",
  };

  return map[gradient];
};
