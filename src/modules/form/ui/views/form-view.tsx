import { DataTable } from "@/components/ui/data-table";
import { Payment, columns } from "../components/columns";
import { Form } from "lucide-react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "2",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "3",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "4",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "5",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "6",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "7",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "8",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "9",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "10",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "11",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "12",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "13",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "14",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "15",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "16",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export const FormView = async () => {
  const data = await getData();
  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="pb-4 flex items-center gap-x-2 font-semibold text-2xl">
        <Form className="text-primary" />
        Form Table
      </h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
};
