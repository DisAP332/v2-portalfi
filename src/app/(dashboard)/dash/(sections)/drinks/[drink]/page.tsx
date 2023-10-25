"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function DrinkDetails({ params }: { params: { drink: string } }) {
  const drinks = useSelector((state: RootState) => state.contentData.drinks);

  const data = drinks.find((drink: any) => drink._id === params.drink);
  return <h1>{data.Name}</h1>;
}

export default DrinkDetails;
