import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button>
      {text}
    </button>
  )
};

export default Button;