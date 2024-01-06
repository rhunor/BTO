"use client"
import NewsLatterBox from "./NewsLatterBox";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAlert = (text: string, type: "success" | "danger" | "info") => {
    // You can replace this with your preferred alert mechanism (e.g., toast notifications)
    console.log(`${type.toUpperCase()}: ${text}`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      handleAlert("Thank you for your message 😃", "success");

      setTimeout(() => {
        handleAlert("Hiding alert...", "info");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error(error);

      handleAlert("I didn't receive your message 😢", "danger");
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form ref={formRef} onSubmit={handleSubmit}>
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
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
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
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
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
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="shadow-submit dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            {/* Assuming you have a NewsLatterBox component */}
            <NewsLatterBox/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
