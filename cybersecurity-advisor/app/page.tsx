import Image from 'next/image'
import ChatComponent from '@/components/chatComponent'

export default function Home() {

  // ChatComponent ? Why make a new component?
  // ChatComponent -> client, text inputs -> onChange -> we need to make a client side component

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-slate-800 p-3 w-[800px] rounded-md text-white">
        <h2 className="text-2xl mb-10"> Welcome to Cybersecurity Advisor Chatbot!!!</h2>
        <p className="text-l mt-5 mb-8 font-serif">As a Cybersecurity Advisor, I provide comprehensive strategies to protect your digital environment. From evaluating security risks to implementing advanced protective measures, my expertise ensures that your information remains safe from cyber threats. Whether you need advice on network security, data protection, or incident response, I offer tailored solutions to meet your unique needs.</p>
        <ChatComponent />
      </div>
      <div className="text-gray-800 mt-12 p-3  rounded-md ">
        <p className="text-2xl mb-6">&copy; Developed by Kavya Yamsani</p>
      </div>


    </main>

  )
}
