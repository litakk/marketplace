import type { Metadata } from "next";
import "./globals.css";

import { getServerSession } from "next-auth";
import Navigation from "./components/Navigation";
import "../custom.css";
import Header from "./components/Header";
import AuthProvider from "@/components/custom/SessionProvider";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "Marketplace",
  description: "Marketplace created by Feruz Aliev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <div>
          <AuthProvider session={session}>
            <div className="relative">
              <ToastContainer />
              <Header />
              {children}
              <Footer />
              <Navigation />
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
