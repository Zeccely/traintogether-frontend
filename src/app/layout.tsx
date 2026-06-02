import type { Metadata } from "next";
import PageFooter from "./../components/page-footer";
import PageHeader from "./../components/page-header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrainTogether",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
        <PageFooter />
      </body>
    </html>
  );
}
