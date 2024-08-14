import Image from "next/image"
import Link from "next/link"
import { getUserchats } from "@/lib/chatService"
import getCurrentUser from "@/lib/getCurrentUser"
import profile from "@/assets/images/robot-profile.png"

const Sidebar = async () => {
  const { userId, name, email }: any = await getCurrentUser()
  const chatList = await getUserchats(userId)
  return (
    <div className="bg-slate-900 w-[300px] text-white p-3 hidden md:flex flex-col border-r border-r-slate-600">
      {userId ? (
        <div className="flex-grow">
          <h2 className="text-lg mb-3 font-bold ml-1">Recent chats</h2>
          <ul>
            {chatList.map((chat: any) => (
              <Link href={`/chat/[id]`} as={`/chat/${chat.id}`} key={chat.id}>
                <li
                  className="bg-slate-700/60 px-3 py-2 font-semibold mb-2 rounded-lg"
                  key={chat.id}
                >
                  {chat.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex-grow grid place-content-center">
          <p className="text-center text-lg">
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>{" "}
            to save Chat
          </p>
        </div>
      )}

      {userId && (
        <div className="flex justify-start items-center gap-3 bg-slate-700/60 px-3 py-2 rounded-full mb-2 overflow-hidden">
          <Image
            src={profile}
            alt="profile"
            width={45}
            height={45}
            className="bg-slate-900 rounded-full"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            <p className="text-sm">{email}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
