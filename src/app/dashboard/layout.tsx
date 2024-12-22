import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left */}
      <div className="w-1/6 md:w-[%8] lg:w-[16%] xl:w-[14%] ">
        L
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/logo1.webp"
            alt="logo"
            className="rounded-full"
            width={50}
            height={50}
          />
          <span className="hidden lg:block font-bold">ΟΡΟΣΗΜΟ</span>
        </Link>
        <Menu />
      </div>
      {/* Right */}
      <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
