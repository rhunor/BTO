import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Musharof Chy",
    designation: "Investor",
    content:
      "Heard quite a number of people testifying on how they make money weekly from this page. I didn't believe at first but wow, oh wow! The returns have been incredible.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Devid Weilium",
    designation: "Trader",
    content:
      "Can't explain how I feel when I receive my profit from your company. I'm getting the result in flying colour. What can I say, you've done great things in my life.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Lethium Frenci",
    designation: "Entrepreneur",
    content:
      "My heart is full of joy all because of your trade option. I just made a successful withdrawal, no more pending withdrawal, always successful.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden bg-white dark:bg-black">
  {/* Clean minimal background */}
      <div className="container">
        <SectionTitle
          title="What Our Clients Say"
          paragraph="With our team of world-class investment professionals, GQG Private Investments delivers exceptional portfolio management and personalized strategies aligned with your wealth objectives."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {testimonialData.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <SingleTestimonial testimonial={testimonial} />
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block border border-gray-800 dark:border-gray-300 px-8 py-4 rounded-md text-base font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Join Our Satisfied Clients Today
          </a>
        </div>
      </div>
      {/* Decorative SVGs removed for minimal white/black aesthetic */}
    </section>
  );
};

export default Testimonials;