// import { cn } from "@/utils/";

import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 font-medium transition",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "border border-gray-300 bg-white hover:bg-gray-50",
        className
      )}
      {...props}
    />
  );
};
