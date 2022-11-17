import { NewsletterSpheres } from "../svg/NewsletterSpheres";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { WaitlistForm } from "../components/WaitlistForm";

// Built with Vivid (https://vivid.lol) ⚡️

const Background = () => (
  <div
    className="absolute bottom-0 right-0 hidden pointer-events-none md:block"
    aria-hidden="true"
  >
    <NewsletterSpheres />
  </div>
);

export const Newsletter = () => {
  return (
    <Section className="px-4 dark sm:px-12">
      <Card className="w-full px-4 py-16 overflow-hidden sm:px-16">
        <Background />
        <div className="gap-6 text-center md:text-left col md:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-100">
            Save your spot today
          </h2>
          <p className="text-lg text-light">
            By joining our waitlist, you&apos;ll be the first to see our
            product. We&apos;d love to learn from you along the way!
          </p>
          <WaitlistForm id="newsletter-waitlist" />
        </div>
      </Card>
    </Section>
  );
};
