import dynamic from "next/dynamic";

const UpdateBlog = dynamic(
  () => import("@/components/AdminComponents/UpdateBlog"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    ),
  }
);

export default function UpdatePage() {
  return <UpdateBlog />;
}
