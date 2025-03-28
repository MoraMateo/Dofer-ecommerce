"use client";

import React, { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const defaultBg = "#0070f3"; // Color de fondo normal
  const hoverBg = "#005bb5";   // Color de fondo en hover
  const textColor = "#fff";    // Texto siempre blanco

  const style: React.CSSProperties = {
    background: hovered ? hoverBg : defaultBg,
    color: textColor,
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
