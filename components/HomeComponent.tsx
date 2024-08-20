import Image from "next/image"
import robots from "@/assets/images/robot.png"

const HomeComponent = ({ setPrompt }: { setPrompt?: any }) => {
  const samplePrompts = [
    "What is the price of iPhone 15?",
    "Suggest smartwatch under 10k?",
    "List the latest laptops with good reviews?",
    "What is the price of Macbook Pro?",
    "What are the latest deals on smartphones?",
    "Give me top 5 best gaming laptops under 10L?",
    "What are the latest deals on speakers?",
  ]

  return (
    <div className="h-full w-full grid place-content-center">
      <div className="flex justify-center items-center flex-col">
        <Image src={robots} alt="Robot" height={100} width={100} />
        <div className="mt-3 grid gap-3 justify-items-center">
          {samplePrompts.map((prompt) => (
            <button
              className="font-semibold border border-slate-950 px-3 rounded-full"
              key={prompt}
              onClick={() => setPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
