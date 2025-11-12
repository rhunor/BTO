const PricingBox = (props: {
  price: string;
  duration: string;
  packageName: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const { price, duration, packageName, subtitle, children } = props;

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp shadow-three dark:bg-black dark:shadow-two dark:hover:shadow-black relative z-10 rounded-sm bg-white px-8 py-10 hover:shadow-one"
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-3xl font-bold text-black dark:text-white">
            $<span className="amount">{price}</span>
            <span className="time text-body-color">/{duration}</span>
          </h3>
          <h4 className="mb-2 text-xl font-bold text-dark dark:text-white">
            {packageName}
          </h4>
        </div>
        <p className="mb-7 text-base text-body-color">{subtitle}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <button className="flex w-full items-center justify-center rounded-sm border border-gray-800 bg-white dark:bg-black p-3 text-base font-semibold text-black dark:text-white transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800">
            Start Free Trial
          </button>
        </div>
        <div>{children}</div>
        {/* Decorative shapes removed for minimal aesthetic */}
      </div>
    </div>
  );
};

export default PricingBox;
