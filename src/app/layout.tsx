import type { Metadata } from "next";
import PageFooter from "./../components/page-footer";
import PageHeader from "./../components/page-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrainTogether",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
        <PageFooter />
      </body>
    </html>
  );
}
