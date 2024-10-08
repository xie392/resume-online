import type { Metadata } from "next";
import "hover.css";
import "@/styles/globals.css";
// import Tooltip from "@/components/tooltip";
import NavHeader from "@/components/layout/nav-header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavHeader />
        {children}
        {/* <Tooltip /> */}
      </body>
    </html>
  );
}
