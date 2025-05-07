import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import AuthForm from "../components/Authforms/AuthForm";
import StoreProvider from "./StoreProvider";
import { TChildren } from "./types/type";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: TChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout">
          <StoreProvider>
            <Header />
            <AuthForm />

            <div className="content">
              <Sidebar />
              <div className="children">{children} </div>
            </div>
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
