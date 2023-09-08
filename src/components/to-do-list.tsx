"use client";
import { trpc } from "@/lib/trpc-client";

export default function ToDoList() {
  const { data, isLoading } = trpc.getTodos.useQuery();

  if (isLoading) return <div>loading...</div>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
