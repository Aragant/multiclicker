import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className, style, ...props }: CardProps) {
  return (
    <div
      className={`w-full max-w-md p-4 z-10 page-transition page-enter ${className || ""}`}
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}