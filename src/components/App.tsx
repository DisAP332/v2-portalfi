"use client";
import HomePageOptions from "@/components/sections/Homepage";
import ContentSection from "@/content/ContentSection";
import { contentTypes } from "@/content-types";

export default function App() {
  return (
    <>
      <HomePageOptions />
      {contentTypes.map((config) => (
        <ContentSection key={config.key} config={config} />
      ))}
    </>
  );
}
