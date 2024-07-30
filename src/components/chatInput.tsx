"use client";

import { CornerDownLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type ChatInputProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="w-full h-max fixed bottom-0 left-0 right-0">
      <div className="bg-background rounded-t-xl border border-b-0 p-4 w-full mx-auto max-w-[700px] container">
        <Card className="flex gap-4 p-4">
          <textarea
            rows={1}
            tabIndex={0}
            className="bg-background outline-none border-none w-full resize-y max-h-32 min-h-8"
            placeholder="Type your message..."
            required
            minLength={2}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <Button
            onClick={handleSubmit}
            disabled={!input || isLoading}
            size={"icon"}
          >
            <CornerDownLeft size={14} />
          </Button>
        </Card>
      </div>
    </div>
  );
}
