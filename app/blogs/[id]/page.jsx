import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import connectDB from "@/lib/config/db";
import { blogModel } from "@/lib/config/models/blogModel";
import { notFound } from "next/navigation";
import removeMarkdown from "remove-markdown";
import ShareButtons from "@/components/ShareButtons";

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await blogModel.findById(id).lean();

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const excerpt =
      removeMarkdown(blog.description || "")
        .substring(0, 160)
        .trim() + (blog.description?.length > 160 ? "..." : "");

    return {
      title: blog.title,
      description: excerpt,
      openGraph: {
        title: blog.title,
        description: excerpt,
        images: [
          { url: blog.image, width: 1200, height: 630, alt: blog.title },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: excerpt,
        images: [blog.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Read the latest blog post",
    };
  }
}

async function getBlogPost(id) {
  try {
    await connectDB();
    const blog = await blogModel.findById(id).lean();

    if (!blog) {
      notFound(); // This will show your 404 page
    }

    // Convert MongoDB objects to plain objects
    return {
      ...blog,
      _id: blog._id.toString(),
      date: blog.date?.toISOString() || new Date().toISOString(),
      createdAt: blog.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: blog.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  const data = await getBlogPost(id);

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <Link href="https://www.rhv1501.me" target="_blank">
            <button className="cursor-pointer flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
              visit Author <Image src={assets.arrow} alt="an arrow" />
            </button>
          </Link>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg || assets.profile_icon}
            width={60}
            height={60}
            alt="author image"
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author || "Rudresh H Vyas"}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt={`Featured image for ${data.title}`}
          className="border-4 border-white"
          priority
        />

        <article>
          <h2 className="my-8 text-[26px] font-semibold">Blog</h2>
          <Markdown content={data.description} />
        </article>

        <ShareButtons
          title={data.title}
          url={`${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/blogs/${id}`}
        />
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-10 mb-20 bg-gray-200 px-5 py-2 rounded-2xl">
        <h3 className="my-5 text-[17px] font-semibold animate-pulse">
          Want the latest tech buzz delivered straight to your inbox?
        </h3>
        <p className="my-3">
          From breakthrough AI and jaw-dropping consumer tech to code that
          actually works (we promise 😅) — we cover it all. Just head to the
          homepage, drop your email, and hit Subscribe. No spam. Just signal.
          The future of tech, delivered straight to your inbox.
        </p>
      </div>

      <Footer />
    </>
  );
}
