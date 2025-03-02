"use client";
import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// IMPORTANT: Keep the original form schema
const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  
  // IMPORTANT: Keep the original form setup
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // IMPORTANT: Keep the original onSubmit function
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setIsLoading(false);
    
    if (signInData?.error) {
      console.log(signInData);
      if (signInData.error === "Email not found") {
        form.setError("email", {
          type: "manual",
          message: "Error: Incorrect email address",
        });
      } else if (signInData.error === "CredentialsSignin") {
        form.setError("password", {
          type: "manual",
          message: "Error: Incorrect password",
        });
      } else {
        form.setError("root.general", {
          type: "manual",
          message: "Error: An unexpected error occurred",
        });
      }
    } else {
      router.refresh();
      router.push("/Dashboard");
    }
    console.log(signInData?.error);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-lg bg-white px-6 py-10 shadow-lg dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign In to Your Account
                </h3>
                <p className="mb-8 text-center text-base font-medium text-body-color">
                  Login to your account and preview your ongoing trades
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
                  Sign in with Google
                </button>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, sign in with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
   
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Signing in...</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-dark dark:text-white"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required={true}
                      {...form.register("email")}
                      placeholder="Enter your email"
                      className={`w-full rounded-md border ${
                        form.formState.errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'
                      } px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-dark dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required={true}
                        {...form.register("password")}
                        placeholder="Enter your password"
                        className={`w-full rounded-md border ${
                          form.formState.errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-stroke bg-[#f8f8f8] dark:border-transparent dark:bg-[#2C303B]'
                        } px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="keepSignedIn"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
                      />
                      <label
                        htmlFor="keepSignedIn"
                        className="ml-2 text-sm font-medium text-body-color dark:text-body-color-dark"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    
                    <div>
                      <Link
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  
                  {form.formState.errors.root?.general && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-200">
                      {form.formState.errors.root.general.message}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white shadow-submit transition-all duration-300 hover:bg-primary/90 hover:shadow-lg dark:shadow-submit-dark"
                  >
                    Sign in
                  </button>
                </form>
                
                <p className="mt-6 text-center text-base font-medium text-body-color dark:text-body-color-dark">
                  Don&apos;t have an account yet?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
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

export default SigninPage;