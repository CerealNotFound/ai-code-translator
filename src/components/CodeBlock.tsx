import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>("Copy");
  const themeContext = useContext(ThemeContext);

  const socket = io("http://localhost:3030");

  const theme = (theme: string) => {
    switch (theme) {
      case "tokyoNight":
        return tokyoNight;
      case "dracula":
        return dracula;
      case "githubDark":
        return githubDark;
      case "dark":
        return "dark";
      default:
        return tokyoNight;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText("Copy");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText("Copied!");
        }}
      >
        {copyText}
      </button>

      <CodeMirror
        editable={editable}
        value={code}
        minHeight="500px"
        extensions={[StreamLanguage.define(go)]}
        theme={theme(themeContext.theme)}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
