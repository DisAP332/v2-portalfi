// Small, reusable cell renderers for ColumnDef.render - each does exactly
// one thing, so a column definition reads as "how", not "how, twice, with
// a subtly different truncation length each time" like the old cards did.

export function truncated(text: string, maxLength: number) {
  if (!text || text.length <= maxLength) {
    return <h1>{text}</h1>;
  }
  return (
    <h1 className="cursor-pointer" onClick={() => window.alert(text)}>
      {text.slice(0, maxLength) + "..."}
    </h1>
  );
}

export function dollars(amount: string | number) {
  return <h1>{amount}$</h1>;
}

export function yesNo(value: boolean) {
  return <h1>{value ? "yes" : "no"}</h1>;
}
