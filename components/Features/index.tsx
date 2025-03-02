import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="relative py-16 md:py-20 lg:py-28 overflow-hidden bg-white dark:bg-gray-dark">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-gray-800/30 -z-10"></div>
        <div className="absolute -right-10 top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -left-20 bottom-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="container">
          <SectionTitle
            title="Our Premium Services"
            paragraph="Experience our comprehensive range of trading and investment services designed to maximize your returns"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {featuresData.map((feature) => (
              <div key={feature.id} className="transform transition duration-300 hover:scale-105">
                <SingleFeature feature={feature} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg"
            >
              Learn More About Our Services
              <svg className="ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;