"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { ContentTypeConfig } from "@/content-types/schema";
import AddIcon from "@/assets/icons/add-new.svg";
import ContentRow from "./ContentRow";
import ContentForm from "./ContentForm";

interface ContentSectionProps<T extends object> {
  config: ContentTypeConfig<T>;
}

export default function ContentSection<T extends object>({ config }: ContentSectionProps<T>) {
  const toggler = useSelector(
    (state: RootState) => state.sectionToggler[config.key]
  );
  const rawItems = useSelector((state: RootState) => state.contentData[config.key]);
  // defense in depth: a failed request (session expired, server rejected)
  // can leave a non-array (e.g. {}) in this slot - guard here rather than
  // trust every dispatch upstream to only ever put an array in it.
  const items = (Array.isArray(rawItems) ? rawItems : []) as (T & {
    _id: string;
  })[];
  const summaryLabel =
    config.columns.find((column) => column.key === config.summaryKey)?.label ??
    config.summaryKey;

  const [showAdd, setShowAdd] = useState({
    show: false,
    css: { display: "none" },
  });
  // see ContentRow's editOpenCount - same remount-on-open contract, so
  // canceling an Add without submitting doesn't leave stale typed values
  // for the next Add.
  const [addOpenCount, setAddOpenCount] = useState(0);

  const AddButton = (
    <>
      <button
        className="bg-green-700 p-1 rounded-full"
        onClick={() => {
          setAddOpenCount((count) => count + 1);
          setShowAdd({ show: true, css: { display: "flex" } });
        }}
      >
        <Image src={AddIcon} alt="Add Icon" width={60} />
      </button>
      <ContentForm key={addOpenCount} config={config} show={showAdd} setShow={setShowAdd} />
    </>
  );

  const rows = items.map((item) => (
    <ContentRow key={item._id} config={config} item={item} />
  ));

  return (
    <div style={toggler.hiderCSS}>
      <div className="hidden sm:block section">
        <div className="flex justify-between">
          <h1 className="text-slate-500 text-3xl font-semibold mt-4">
            {config.navLabel}
          </h1>
        </div>
        <div className="shadow-md hidden lg:block">
          <div
            className="sectionHeader"
            style={{
              display: "grid",
              gridTemplateColumns: config.desktopGridColumns,
            }}
          >
            {config.columns.map((column) => (
              <h1 key={column.key} className="text-center">
                {column.label}
              </h1>
            ))}
            <h1 className="text-center">Actions</h1>
          </div>
        </div>
        <div className="shadow-md hidden md:block lg:hidden">
          <div className="sectionHeader mdGrid">
            <h1>Name</h1>
            <h1>{summaryLabel}</h1>
            <h1>Actions</h1>
          </div>
        </div>
        {rows}
        <div className="flex justify-end pt-4">{AddButton}</div>
      </div>
      <div className="block sm:hidden section">
        <div className="flex justify-center bg-slate-100 w-full h-20">
          <h1 className="text-slate-500 bg-slate-100 text-3xl font-semibold mt-4">
            {config.navLabel}
          </h1>
        </div>
        <div className="sectionHeader smGrid">
          <h1>Name</h1>
          <h1>Actions</h1>
        </div>
        {rows}
        <div className="flex justify-end pt-4">{AddButton}</div>
      </div>
    </div>
  );
}
