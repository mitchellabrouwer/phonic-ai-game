import { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "../components/providers/ReduxProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alphabet Wonderland",
  description: "A fun and interactive way to learn the alphabet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <div className="floating-shape" />
          <div className="floating-shape" />
          <div className="floating-shape" />
          <div className="floating-shape" />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
