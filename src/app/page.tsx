import ToDoList from "@/components/to-do-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ToDoList />
    </main>
  );
}
