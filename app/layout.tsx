import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./ui/animations.css";
import Navbar from "./ui/Navbar";
import { WebSocketProvider } from "./context/webSocket/webSocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multiclicker",
  description: "Created By Huggggggggo and Thomas (in development)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <WebSocketProvider >
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Russo+One&display=swap" rel="stylesheet" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
        >
          {children}
          <Navbar />
        </body>
      </WebSocketProvider>
    </html>
  );
}
