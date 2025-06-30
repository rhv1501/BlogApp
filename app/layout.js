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
  title: "Blog | Rudresh H Vyas",
  description: "Personal blog of Rudresh H Vyas",
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
