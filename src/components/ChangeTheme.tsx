"use client";
import { ThemeContext } from "@/contexts/themeContext";
import { ChangeEventHandler, useContext } from "react";

const ChangeTheme = () => {
  const themeContext = useContext(ThemeContext);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await themeContext.setTheme(e.target.value);
    console.log(themeContext);
  };
  return (
    <select
      onChange={handleChange}
      className="absolute left-10 top-10 rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
    >
      <option value={"tokyoNight"}>Tokyo Night</option>
      <option value={"dark"}>Dark</option>
      <option value={"dracula"}>Dracula</option>
      <option value={"githubDark"}>Github Dark</option>
    </select>
  );
};

export default ChangeTheme;
