"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, c) {
                w.ChatraID = 'RWDhiQSbjhNn9MS7p'; // Replace with your Chatra ID
                var s = d.createElement('script');
                s.src = 'https://call.chatra.io/chatra.js'; // Replace with your Chatra ID
                s.async = true;
                d.head.appendChild(s);
              })(document, window);
            `,
          }}
        />
      </head>
      
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <SessionProvider refetchInterval={5 * 60}>
          <Providers>
            <Header session />
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}


