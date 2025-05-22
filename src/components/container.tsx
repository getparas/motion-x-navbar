import type React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-4xl px-4", className)}>{children}</div>
  );
};

export default Container;
