import { assets } from "@/assets/assets";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

export default function Layout({ children }) {
  const Sidebar = dynamic(() => import("@/components/AdminComponents/Sidebar"));
  const Backbutton = dynamic(() =>
    import("@/components/AdminComponents/Backbutton")
  );
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
              <Backbutton />
              <h3 className="font-medium ">Admin Pannel</h3>
              <Image src={assets.profile_icon} width={40} alt="profile" />
            </div>
            {children}
          </div>
        </div>
      </Suspense>
    </>
  );
}
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};
