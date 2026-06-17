import type { Metadata } from "next";
import "./globals.css"; // THIS IS THE CRUCIAL LINE!

export const metadata: Metadata = {
  title: "Think India | The Network",
  description: "Connecting the brightest minds of the nation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}