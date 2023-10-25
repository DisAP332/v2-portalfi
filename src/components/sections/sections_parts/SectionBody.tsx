"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import EventCard from "./cards/EventCard";
import DrinkCard from "./cards/DrinkCard";
import { useEffect, useState } from "react";

interface IProps {
  location: string;
}

export function EventBody() {
  const events = useSelector((state: RootState) => state.contentData.events);

  return (
    <div className="CardContainer">
      {events !== null && events ? (
        events.map((items: { _id: string }) => (
          <div className="CardBox" key={items._id}>
            <EventCard {...items} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export function DrinksBody() {
  const drinks = useSelector((state: RootState) => state.contentData.drinks);
  return (
    <div className="CardContainer">
      {drinks !== null && drinks ? (
        drinks.map((items: { _id: string }) => (
          <div className="CardBox" key={items._id}>
            <DrinkCard {...items} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
