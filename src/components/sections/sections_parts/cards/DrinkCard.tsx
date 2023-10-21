function DrinkCard(Props: any) {
  return (
    <div id="card" className="drinksGrid text-slate-700">
      <div>
        <h1>{Props.Name}</h1>
      </div>
      <div>
        <h1>{Props.Cost}$</h1>
      </div>
      <div>
        <h1>{Props.Category}</h1>
      </div>
      <div>
        {Props.Description ? (
          Props.Description.length < 30 ? (
            <h1>{Props.Description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Description)}
            >
              {Props.Description.slice(0, 30) + "..."}
            </h1>
          )
        ) : (
          <></>
        )}
      </div>
      <div>
        {Props.Ingredients ? (
          Props.Ingredients.length < 30 ? (
            <h1>{Props.Ingredients}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Ingredients)}
            >
              {Props.Ingredients.slice(0, 30) + "..."}
            </h1>
          )
        ) : (
          <></>
        )}
      </div>
      <div>
        <h1>{Props.IsSpecial ? "true" : "false"}</h1>
      </div>
      <div className="text-slate-100 ml-4">
        <button
          className="editBtn bg-slate-400"
          //   onClick={() =>
          //     setShowEditModal({ show: true, css: { display: "flex" } })
          //   }
        >
          Edit
        </button>
        <button
          className="deleteBtn bg-red-600"
          // onClick={() => handleDelete()}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default DrinkCard;
