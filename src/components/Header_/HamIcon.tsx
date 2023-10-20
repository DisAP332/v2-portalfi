"use client";

import { useState } from "react";

export const HamToXBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="HTXB"
        className={isOpen ? "open" : ""}
        onClick={() => handleIconClick()}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
