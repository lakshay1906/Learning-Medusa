"use client";

import { ClipLoader, GridLoader } from "react-spinners";
import { useTheme } from "next-themes";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <div className="w-full h-screen grid place-content-center">
      <GridLoader color={`${theme === "light" ? "#000" : "#fff"}`} />
    </div>
  );
}
