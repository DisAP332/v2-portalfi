"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import crudActions from "@/helpers/crudActions";
import { dataActions } from "@/redux/slices/contentDataSlice";
import { ContentTypeConfig, FormField } from "@/content-types/schema";

type ShowState = { show: boolean; css: { display: string } };

interface ContentFormProps<T extends object> {
  config: ContentTypeConfig<T>;
  show: ShowState;
  setShow: (show: ShowState) => void;
  // present only in edit mode; its absence is what makes this an add form
  editing?: { _id: string; item: T };
}

const HIDE: ShowState = { show: false, css: { display: "none" } };

function get(obj: any, key: string) {
  return obj[key];
}

function setKey<T>(obj: T, key: string, value: unknown): T {
  return { ...obj, [key]: value };
}

function setNestedKey<T>(
  obj: T,
  parentKey: string,
  childKey: string,
  value: unknown
): T {
  return {
    ...obj,
    [parentKey]: { ...(obj as any)[parentKey], [childKey]: value },
  };
}

function FormFieldInput<T>({
  field,
  data,
  setData,
}: {
  field: FormField<T>;
  data: T;
  setData: (data: T) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          required
          value={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        />
      );
    case "textarea":
      return (
        <textarea
          required
          value={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        />
      );
    case "number":
      return (
        <input
          type="number"
          required
          value={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        />
      );
    case "date":
      return (
        <input
          type="date"
          required
          value={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        />
      );
    case "time":
      return (
        <input
          type="time"
          required
          value={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={get(data, field.key)}
          onChange={(e) => setData(setKey(data, field.key, e.target.checked))}
        />
      );
    case "select": {
      const currentValue = get(data, field.key);
      // a value written outside this form (legacy data, or a future
      // config that removes an option) wouldn't match any <option> here -
      // surface it instead of silently swapping the select to a different
      // value the moment this form renders.
      const isKnownValue = field.options.some(
        (option) => option.value === currentValue
      );
      return (
        <select
          value={currentValue}
          onChange={(e) => setData(setKey(data, field.key, e.target.value))}
        >
          {!isKnownValue && currentValue ? (
            <option value={currentValue}>{currentValue} (unrecognized)</option>
          ) : null}
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    case "checkboxGroup":
      return (
        <div className="flex justify-around">
          {field.options.map((option) => (
            <span key={option.key}>
              {option.label}
              <input
                type="checkbox"
                checked={get(data, field.key)[option.key]}
                onChange={(e) =>
                  setData(
                    setNestedKey(
                      data,
                      field.key,
                      option.key,
                      e.target.checked
                    )
                  )
                }
              />
            </span>
          ))}
        </div>
      );
    case "toggleNumber": {
      const group = get(data, field.key);
      const enabled = group[field.enabledKey];
      return (
        <>
          {enabled ? (
            <button
              type="button"
              onClick={() =>
                setData(setNestedKey(data, field.key, field.enabledKey, false))
              }
            >
              X
            </button>
          ) : null}
          {enabled ? (
            <input
              type="number"
              required
              value={group[field.numberKey]}
              onChange={(e) =>
                setData(
                  setNestedKey(
                    data,
                    field.key,
                    field.numberKey,
                    Number(e.target.value)
                  )
                )
              }
            />
          ) : (
            <input
              type="checkbox"
              checked={enabled}
              onChange={() =>
                setData(setNestedKey(data, field.key, field.enabledKey, true))
              }
            />
          )}
        </>
      );
    }
  }
}

export default function ContentForm<T extends object>({
  config,
  show,
  setShow,
  editing,
}: ContentFormProps<T>) {
  const dispatch = useDispatch();
  // The caller remounts this component (via a changing `key`) each time
  // it's opened - see ContentRow/ContentSection - so this initializer
  // reliably re-reads the current item/blank value on every open, instead
  // of only once for a form that would otherwise stay mounted (just
  // CSS-hidden) between opens.
  const [data, setData] = useState<T>(editing?.item ?? config.initialValue);

  const handleSubmit = () => {
    const action = editing
      ? crudActions.Update(editing._id, config.key, data)
      : crudActions.Create(config.key, data);

    action.then((res) => {
      if (!res || res.success !== true) return;
      dispatch(dataActions({ requested: config.key, data: res.data as object[] }));
      if (!editing) setData(config.initialValue);
      setShow(HIDE);
    });
  };

  return (
    <div className="modal_container" style={show.css}>
      <div className="modal">
        <div className="bg-slate-700 text-center text-3xl pt-2 pb-2 rounded-t-xl grid grid-cols-3">
          <div />
          <div>
            {editing ? "Edit" : "Add"} {config.label}
          </div>
          <div className="flex justify-end mr-3">
            <button onClick={() => setShow(HIDE)}>X</button>
          </div>
        </div>
        <div className="bg-slate-100">
          <div className="flex justify-center pt-8 pb-8">
            <form className="flex flex-col text-slate-800">
              {config.fields.map((field) => (
                <div key={field.key}>
                  {field.label}:
                  <FormFieldInput field={field} data={data} setData={setData} />
                </div>
              ))}
            </form>
          </div>
        </div>
        <div className="bg-slate-700 flex justify-end">
          <button
            className="bg-slate-300 pt-1 pb-1 pr-3 pl-3 m-3 rounded-xl text-xl"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
