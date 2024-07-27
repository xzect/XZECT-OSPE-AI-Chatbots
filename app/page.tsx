import { Header, Sidebar } from "@/components"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-400">
      <Header />
      <div className="h-full w-screen flex justify-center items-center">
        <Sidebar />
        <div className="flex-grow">
          <div className="grid place-content-center">
            <h1>Hello, World!</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
