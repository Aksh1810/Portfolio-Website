import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a safe default, could switch to Outfit
import "./globals.css";
import Cursor from "@/components/Cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aksh Patel | Portfolio",
  description: "Creative Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white`}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
