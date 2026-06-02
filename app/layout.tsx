import type { Metadata } from "next";
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
  title: "Dia dos Namorados ❤️",
  description: "Celebre o amor e a paixão",
  icons: {
    icon: "/vercel.svg",
  },
  openGraph: {
    title: "Dia dos Namorados ❤️",
    description: "Celebre o amor e a paixão - Compartilhe sua história de amor!",
    url: "https://dia-namorados-nine.vercel.app",
    siteName: "Dia dos Namorados",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Dia dos Namorados",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dia dos Namorados ❤️",
    description: "Celebre o amor e a paixão",
    images: ["/vercel.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
