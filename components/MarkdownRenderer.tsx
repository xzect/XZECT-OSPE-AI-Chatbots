import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const MarkdownRenderer = ({ text }: { text: string }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
