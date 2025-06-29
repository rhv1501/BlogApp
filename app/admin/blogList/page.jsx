import dynamic from "next/dynamic";
import { Suspense } from "react";

const page = () => {
  const BlogList = dynamic(() =>
    import("@/components/AdminComponents/Bloglist", { loading: <Loading /> })
  );
  return (
    <Suspense fallback={<Loading />}>
      <BlogList />
    </Suspense>
  );
};
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};
export default page;
