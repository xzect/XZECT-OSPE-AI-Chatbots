import { getServerSession } from "next-auth"
import Link from "next/link"
import authOptions from "@/app/api/auth/[...nextauth]/options"

const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="bg-slate-900 w-[300px] text-white p-3 flex flex-col">
      <div className="flex-grow">
        <h2 className="text-lg mb-3 font-bold ml-1">Recent chats</h2>
        <ul>
          {/* ToDo: Make */}
          <Link href="">
            <li className="bg-slate-700/60 px-3 py-2 font-semibold mb-2 rounded-lg">
              Chat title 1
            </li>
          </Link>
          <Link href="">
            <li className="bg-slate-700/60 px-3 py-2 font-semibold mb-2 rounded-lg">
              Chat title 2
            </li>
          </Link>
          <Link href="">
            <li className="bg-slate-700/60 px-3 py-2 font-semibold mb-2 rounded-lg">
              Chat title 3
            </li>
          </Link>
        </ul>
      </div>

      {session?.user && (
        <div className="flex justify-start items-center gap-3 bg-slate-700/60 px-4 py-2 rounded-full mb-2">
          {/* ToDo: Sample Image */}
          <div className="rounded-full bg-blue-700 h-[45px] w-[45px] grid place-content-center">
            <span className="text-3xl text-black font-bold">
              {session?.user.name?.slice(0, 1)}
            </span>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{session.user.name}</h3>
            <p className="text-sm">{session.user.email}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
