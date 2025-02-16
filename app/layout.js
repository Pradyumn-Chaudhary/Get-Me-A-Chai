import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SessionWrapper from "./Components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me a Chai : A website for contributing to the chai community",
  description:
    "Get me a Chai is a website for contributing to the chai community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={`${inter.className} flex flex-col min-h-screen text-white`}>
          <SessionWrapper>
            {/* Navbar at the top */}
            <Navbar />

            {/* Main content takes remaining space */}
            <main className="flex-grow w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              {children}
            </main>

            {/* Footer at the bottom */}
            <Footer />
          </SessionWrapper>
        </div>
      </body>
    </html>
  );
}
