import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { getRoleValue, getIdValue } from "@/lib/utils";
import { Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type SubjectList = Subject & { teachers: Teacher[] };

export default async function SubjectListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  //GET ROLE AND CURRENT ID
  let role = await getRoleValue();
  let currentUserId = await getIdValue();

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },

    {
      header: "Actions",
      accessor: "actions",
      className: "hidden md:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center p-4 gap-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join("")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  //PAGINATING../

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS

  const query: Prisma.SubjectWhereInput = {};

  // Destructuring to filter params and protect data
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between ">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={15} height={15} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={15} height={15} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* list */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
}
