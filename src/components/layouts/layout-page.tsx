"use client";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface LayoutPageProps {
  className?: string;
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = (props) => {
  return (
    <main
      className={cn(
        "container flex flex-col gap-4 mx-auto p-8",
        props.className,
      )}
    >
      {props.children}
    </main>
  );
};
