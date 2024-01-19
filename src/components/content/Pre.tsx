import { cn } from "@/utils";
import { createRef, useState, type ReactNode } from "react";

const EnhancedPreElement = ({ children, className, ...props }: { children: ReactNode, className: string }) => {
  const [copyText, setCopyText] = useState("📄");
  const snippetRef = createRef<HTMLPreElement>();

  const copyToClipboard = async () => {
    let snippet = snippetRef.current;
    let snippetText = snippet?.innerText ?? "";
    await navigator.clipboard.writeText(snippetText);

    setCopyText("👍")
    setTimeout(() => {
      setCopyText("📄")
    }, 900);
  };

  return (
    <div className="relative mt-6 mb-4 group">
      <pre className={
        cn("overflow-x-auto rounded-lg border bg-black p-4",
        "scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-700 scrollbar-rounded-md dark:scrollbar-track-zinc-700 dark:scrollbar-thumb-white",
        className)} {...props} ref={snippetRef}
      >
        {children}
      </pre>
      <button
        className="absolute top-4 right-4 invisible p-1 text-xl text-gray-300 bg-gray-700 rounded group-hover:visible"
        onClick={() => {
          copyToClipboard();
        }}
      >{copyText}</button>
    </div>
  );
};

export default EnhancedPreElement;
