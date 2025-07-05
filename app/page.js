import Bloglist from "@/components/Bloglist";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Home",
  description:
    "Explore the latest blog posts about technology, programming, web development, and software engineering by Rudresh H Vyas.",
  openGraph: {
    title: "Rudresh H Vyas Blog - Latest Tech Insights",
    description:
      "Explore the latest blog posts about technology, programming, web development, and software engineering.",
    type: "website",
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_BASE_URL || "https://blog.rudreshvyas.com",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rudresh H Vyas Blog",
    description:
      "Personal blog covering technology, programming, web development, and software engineering insights.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://blog.rhv1501.me",
    author: {
      "@type": "Person",
      name: "Rudresh H Vyas",
    },
    publisher: {
      "@type": "Organization",
      name: "Rudresh H Vyas",
      logo: {
        "@type": "ImageObject",
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL || "https://blog.rhv1501.me"
        }/logo.png`,
      },
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />
      <main>
        <Bloglist />
      </main>
      <Footer />
    </>
  );
}
