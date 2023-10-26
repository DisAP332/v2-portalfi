"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import EventCard from "./cards/EventCard";
import DrinkCard from "./cards/DrinkCard";
import FoodCard from "./cards/FoodCard";

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

export function FoodBody() {
  const food = useSelector((state: RootState) => state.contentData.food);
  return (
    <div className="CardContainer">
      {food !== null && food.length !== 0 ? (
        food.map((items: { _id: string }) => (
          <div className="CardBox" key={items._id}>
            <FoodCard {...items} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
