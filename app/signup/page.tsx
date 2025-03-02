"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// Define types for form data and errors
interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

// Country data with codes
const countries = [
  { name: "United States", code: "USA", dialCode: "+1" },
  { name: "United Kingdom", code: "UK", dialCode: "+44" },
  { name: "Japan", code: "Japan", dialCode: "+81" },
  { name: "China", code: "China", dialCode: "+86" },
  { name: "India", code: "India", dialCode: "+91" },
  { name: "Germany", code: "Germany", dialCode: "+49" },
  { name: "France", code: "France", dialCode: "+33" },
  { name: "Italy", code: "Italy", dialCode: "+39" },
  { name: "Russia", code: "Russia", dialCode: "+7" },
  { name: "Brazil", code: "Brazil", dialCode: "+55" },
  { name: "South Korea", code: "South Korea", dialCode: "+82" },
  { name: "Spain", code: "Spain", dialCode: "+34" },
  { name: "Pakistan", code: "Pakistan", dialCode: "+92" },
  { name: "Indonesia", code: "Indonesia", dialCode: "+62" },
  { name: "Canada", code: "Canada", dialCode: "+1" },
  { name: "Australia", code: "Australia", dialCode: "+61" },
  { name: "Mexico", code: "Mexico", dialCode: "+52" },
  { name: "Singapore", code: "Singapore", dialCode: "+65" },
  { name: "Turkey", code: "Turkey", dialCode: "+90" },
  { name: "Egypt", code: "Egypt", dialCode: "+20" },
  { name: "South Africa", code: "South Africa", dialCode: "+27" },
  { name: "Sweden", code: "Sweden", dialCode: "+46" },
  { name: "Netherlands", code: "Netherlands", dialCode: "+31" },
  { name: "Kazakhstan", code: "Kazakhstan", dialCode: "+7" },
  { name: "Vietnam", code: "Vietnam", dialCode: "+84" },
  { name: "Philippines", code: "Philippines", dialCode: "+63" },
  { name: "Afghanistan", code: "Afghanistan", dialCode: "+93" },
  { name: "Belgium", code: "Belgium", dialCode: "+32" },
];

const SignupPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // Define the type for form errors
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({}); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // When country changes, update the country code
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.code === formData.country);
      if (selectedCountry) {
        setFormData(prev => ({
          ...prev,
          countryCode: selectedCountry.dialCode
        }));
      }
    }
  }, [formData.country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox' && name === 'agreeToTerms') {
      setAgreedToTerms(checked);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    
    // Check required fields
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.country) errors.country = "Please select your country";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    // Terms agreement
    if (!agreedToTerms) {
      errors.terms = "You must agree to the Terms and Conditions";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[550px] rounded-lg bg-white px-6 py-10 shadow-lg dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create Your Account
                </h3>
                <p className="mb-8 text-center text-base font-medium text-body-color">
                  Start your investment journey today
                </p>
                
                <button
                  className="mb-6 flex w-full items-center justify-center rounded-md border border-stroke bg-[#f8f8f8] px-6 py-3 text-base font-medium text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                  onClick={() => signIn("google")}
                >
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or register with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                
                {errorMessage && (
                  <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-200">
                    <p>{errorMessage}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} method="post" className="space-y-5">
                  {isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Creating your account...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Name fields - two columns */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className={`w-full rounded-md border ${formErrors.firstName ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      {formErrors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className={`w-full rounded-md border ${formErrors.lastName ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      {formErrors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${formErrors.country ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                    >
                      <option value="">Select your country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.country}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone-number" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <select
                        id="country-code"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="mr-2 w-24 rounded-md border border-stroke bg-[#f8f8f8] px-3 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        {countries.map((country, index) => (
                          <option key={index} value={country.dialCode}>
                            {country.dialCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone-number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className={`w-full rounded-md border ${formErrors.phoneNumber ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                    </div>
                    {formErrors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full rounded-md border ${formErrors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full rounded-md border ${formErrors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.password}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        className={`w-full rounded-md border ${formErrors.confirmPassword ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'} px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
                      />
                    </div>
                    <label htmlFor="agreeToTerms" className="ml-2 text-sm font-medium text-body-color dark:text-body-color-dark">
                      By creating an account, I agree to the{" "}
                      <Link href="/Terms" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                  {formErrors.terms && (
                    <p className="text-xs text-red-500">{formErrors.terms}</p>
                  )}
                  
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white shadow-submit transition-all duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                  >
                    Create Account
                  </button>
                </form>
                
                <p className="mt-6 text-center text-base font-medium text-body-color dark:text-body-color-dark">
                  Already using Binary Crypto Options?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;