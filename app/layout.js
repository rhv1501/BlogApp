import { Outfit } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Blog | Rudresh H Vyas",
    template: "%s | Rudresh H Vyas",
  },
  description:
    "Personal blog of Rudresh H Vyas covering technology, programming, web development, and software engineering insights.",
  keywords: [
    "blog",
    "technology",
    "programming",
    "web development",
    "software engineering",
    "Rudresh Vyas",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "_me4aiBwRUNy1Sm33R3EBj7aT4Ff8EAS3Uw0EdBy3d0",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://blog.rhv1501.me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://blog.rhv1501.me",
    siteName: "Rudresh H Vyas Blog",
    title: "Blog | Rudresh H Vyas",
    description:
      "Personal blog of Rudresh H Vyas covering technology, programming, web development, and software engineering insights.",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Rudresh H Vyas Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rudresh H Vyas",
    description:
      "Personal blog of Rudresh H Vyas covering technology, programming, web development, and software engineering insights.",
    images: ["/og-image.png"],
    creator: "@rhv1501",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <ToastContainer theme="dark" />
        {children}
      </body>
    </html>
  );
}
