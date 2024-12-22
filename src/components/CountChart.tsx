"use client";
import { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  {
    name: "girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#C3EBFA",
  },
];

export default function CountChart() {
  return (
    <div className="bg-white rounded-xl w-full p-4 h-full">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* chart  */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={30}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* botom  */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full"></div>
          <h1 className="font-bold">1,2345</h1>
          <h2 className="text-xs text-gray">Boys(55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full"></div>
          <h1 className="font-bold">1,2345</h1>
          <h2 className="text-xs text-gray">Girls(45%)</h2>
        </div>
      </div>
    </div>
  );
}
