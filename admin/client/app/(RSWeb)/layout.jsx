"use client"
import "./globals.css";
import Navbar from "./common/navbar/Navbar";
import Footer from "./common/footer/Footer";
import WebAuthGuard from "./context/auth/web-auth-guard";
export default function WebRootLayout({ children }) {

  return (
    <>
      <WebAuthGuard>
        <Navbar />
        {children}
        <Footer />
      </WebAuthGuard>
    </>
  );
}
