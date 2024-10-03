import type { Metadata } from "next";
import {Inter, Roboto} from "next/font/google"
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";



export const metadata: Metadata = {
  title: "TikTik",
  description: "TikTok clone built entirely with Typescript",
};

const inter = Inter({
  subsets: ['latin']
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= {`${inter.className} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
        >
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              {children}
            </div>
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
