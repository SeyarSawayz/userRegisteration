import React from "react";

const Button = ({
  children,

  width = "w-40",
  height = "h-12",
  bgColor = "bg-red-400",
  className = "",
  type = "submit",
  ...props
}) => {
  return (
    <Button
      className={`${bgColor} hover:bg-blue-600 text-white px-3 py-4 ${width} ${height} rounded-lg cursor-pointer flex items-center justify-center ${className}`}
      {...props}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default Button;
