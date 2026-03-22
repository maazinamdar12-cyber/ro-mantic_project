import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {AuthProvider} from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["300", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RO-mantic",
  description: "RO purifier ecommerce & service website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} ${robotoMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <AuthProvider>

        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
         <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
