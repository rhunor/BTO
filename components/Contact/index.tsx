"use client";
import NewsLatterBox from "./NewsLatterBox";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "danger" | "info" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAlert = (text: string, type: "success" | "danger" | "info") => {
    setFormStatus({ type, message: text });
    
    if (type === "success" || type === "danger") {
      setTimeout(() => {
        setFormStatus({ type: null, message: "" });
      }, 5000);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      handleAlert("Please fill in all fields", "danger");
      return;
    }

    try {
      setLoading(true);

      await emailjs.send(
        process.env.VITE_APP_EMAILJS_SERVICE_ID || "",
        process.env.VITE_APP_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          to_name: "BinaryTradingOptions",
          from_email: formData.email,
          to_email: "elaineedriveres@gmail.com",
          message: formData.message,
        },
        process.env.VITE_APP_EMAILJS_PUBLIC_KEY || ""
      );

      setLoading(false);
      handleAlert("Thank you for your message! We'll get back to you soon 😃", "success");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      handleAlert("We couldn't send your message. Please try again later 😢", "danger");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-dark">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900/30 -z-10"></div>
      <div className="absolute -left-40 top-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-40 bottom-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
            Get In Touch
          </h2>
          <p className="mt-4 text-base text-body-color dark:text-body-color-dark mx-auto max-w-[600px]">
            Have questions about our investment options? Our support team is ready to help you.
          </p>
        </div>
        
        <div className="-mx-4 flex flex-wrap items-stretch">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-lg bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] hover:shadow-lg transition-all duration-300">
              <h3 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h3>
              <p className="mb-8 text-base font-medium text-body-color dark:text-body-color-dark">
                Our support team will get back to you ASAP via email.
              </p>
              
              {/* Form status alerts */}
              {formStatus.type && (
                <div className={`mb-8 rounded-lg px-6 py-4 ${
                  formStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 
                  formStatus.type === 'danger' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  <p>{formStatus.message}</p>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary focus:shadow-input dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary focus:shadow-input dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your Message"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary focus:shadow-input dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="shadow-submit dark:shadow-submit-dark rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block animate-pulse">Submitting...</span>
                          <span className="absolute inset-0 h-[2px] w-full bg-white/20 animate-[loading_2s_ease-in-out_infinite]"></span>
                        </>
                      ) : (
                        "Submit Ticket"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
      
      {/* Additional contact info */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
          
          {/* Hours */}
            <div className="wow fadeInUp bg-white dark:bg-gray-dark rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center mx-auto">
            <div className="mx-auto mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63621 23.3638 2.66666 16 2.66666C8.63619 2.66666 2.66666 8.63621 2.66666 16C2.66666 23.3638 8.63619 29.3333 16 29.3333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8V16L21.3333 18.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Working Hours</h3>
            <p className="text-body-color dark:text-body-color-dark">
              Monday - Friday: 9:00AM - 8:00PM<br />
              24/7 Trading Platform Access
            </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;