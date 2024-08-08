import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        
        "Johnny 5 is ALIVE!!!🤖",
        1000,
        "I'm Your Personal OpenAI ChatGPT! 🤖",
        2000,
        " How can I assist you today?💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;