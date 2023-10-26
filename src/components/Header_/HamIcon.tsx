"use client";

import { showorHiderMenu } from "@/redux/slices/menuTogglerSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const HamToXBtn = () => {
  const [isOpen, setIsOpen] = useState({
    open: false,
    css: { display: "none" },
  });

  const handleIconClick = () => {
    setIsOpen({
      open: !isOpen.open,
      css: isOpen.open ? { display: "none" } : { display: "block" },
    });
    dispatch(showorHiderMenu("mobileDD"));
  };

  const dispatch = useDispatch();

  return (
    <>
      <div
        id="HTXB"
        className={isOpen.open ? "open" : ""}
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
