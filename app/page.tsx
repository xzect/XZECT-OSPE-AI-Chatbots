import { Header, Sidebar } from "@/components"

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-400">
      <Header />
      <div className="h-full w-screen flex justify-center flex-grow">
        <Sidebar />
        <div className="grid place-content-center flex-grow">
          <h1>Hello, World!</h1>
        </div>
      </div>
    </div>
  )
}
