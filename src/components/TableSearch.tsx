import Image from "next/image";

export default function TableSearch() {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="as" width={15} height={15} />
      <input
        type="text"
        placeholder="Search"
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
}
