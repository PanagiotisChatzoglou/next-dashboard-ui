"use client";
import { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

export default function CountChart({
  boys,
  girls,
}: {
  boys: number;
  girls: number;
}) {
  const data = [
    {
      name: "girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];

  return (
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
  );
}
