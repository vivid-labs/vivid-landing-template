import { Features } from "../src/sections/Features";
import { FeatureBlocks } from "../src/sections/FeatureBlocks";
import { Footer } from "../src/sections/Footer";
import { Header } from "../src/sections/Header";
import { Hero } from "../src/sections/Hero";
import { Newsletter } from "../src/sections/Newsletter";
import { Testimonials } from "../src/sections/Testimonials";

const Home = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <Features />
        <FeatureBlocks />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
