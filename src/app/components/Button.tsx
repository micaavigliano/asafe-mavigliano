import React, { ReactNode } from "react";
import { TbLoader } from "react-icons/tb";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "link";
  children: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({ children, variant = "primary", loading = false, onClick, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300 px-2 py-1",
    link: "bg-transparent text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${loading ? "opacity-70 cursor-not-allowed" : ""} flex justify-center items-center`}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? <TbLoader size={25} className="animate-spin text-center" aria-live="polite" live-region="true" /> : children}
    </button>
  );
};

export default Button;
