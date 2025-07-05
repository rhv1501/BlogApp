export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    // Only try to connect to database if we have a proper MongoDB URI
    if (process.env.MONGODB_URI) {
      const { connectDB } = await import("@/lib/config/db");
      const BlogModel = (await import("@/lib/config/models/blogModel")).default;
      
      await connectDB();
      
      
      const blogs = await BlogModel.find({}).select("_id date");
      
      
      const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog._id}`,
        lastModified: new Date(blog.date),
        changeFrequency: "monthly",
        priority: 0.8,
      }));

      return [...staticUrls, ...blogUrls];
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  // Return static pages only if database connection fails
  return staticUrls;
}
