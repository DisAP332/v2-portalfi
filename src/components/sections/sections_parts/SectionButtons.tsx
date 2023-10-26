"use client";

import { useState } from "react";
//icon
import AddIcon from "@/assets/icons/add-new.svg";
import Image from "next/image";
import AddEvent from "../modals/add/AddEvent";
import CartProvider from "@/redux/CartProvider";
import AddDrink from "../modals/add/AddDrink";
import AddFood from "../modals/add/AddFood";

function AddButton(Props: { location: string }) {
  let button = <></>;

  const [showAddModal, setShowAddModal] = useState({
    show: false,
    css: { display: "none" },
  });

  switch (Props.location) {
    case "events":
      button = (
        <>
          <button
            className="bg-green-700 p-1 rounded-full"
            onClick={() =>
              setShowAddModal({ show: true, css: { display: "flex" } })
            }
          >
            <Image src={AddIcon} alt="Add Icon" width={60} />
          </button>
          <CartProvider>
            <AddEvent show={showAddModal} setShow={setShowAddModal} />
          </CartProvider>
        </>
      );
      break;
    case "drinks":
      button = (
        <>
          <button
            className="bg-green-700 p-1 rounded-full"
            onClick={() =>
              setShowAddModal({ show: true, css: { display: "flex" } })
            }
          >
            <Image src={AddIcon} alt="Add Icon" width={60} />
          </button>
          <CartProvider>
            <AddDrink show={showAddModal} setShow={setShowAddModal} />
          </CartProvider>
        </>
      );
      break;
    case "food":
      button = (
        <>
          <button
            className="bg-green-700 p-1 rounded-full"
            onClick={() =>
              setShowAddModal({ show: true, css: { display: "flex" } })
            }
          >
            <Image src={AddIcon} alt="Add Icon" width={60} />
          </button>
          <CartProvider>
            <AddFood show={showAddModal} setShow={setShowAddModal} />
          </CartProvider>
        </>
      );
      break;
  }
  return button;
}

export default AddButton;
