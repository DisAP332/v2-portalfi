function FoodCard(Props: any) {
  return (
    <div id="card" className="foodGrid text-slate-700">
      <div>
        <h1>{Props.Name}</h1>
      </div>
      <div>
        {Props.Description ? (
          Props.Description.length < 14 ? (
            <h1>{Props.Description}</h1>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => window.alert(Props.Description)}
            >
              {Props.Description.slice(0, 14) + "..."}
            </h1>
          )
        ) : null}
      </div>
      <div className="flex justify-center">
        <h1>{Props.Cost}$</h1>
      </div>
      <div className="flex justify-center">
        {Props.Sale ? (
          Props.Sale.Is ? (
            <h1>{Props.Sale.Percentage}%</h1>
          ) : (
            <h1>None</h1>
          )
        ) : null}
      </div>
      <div className="flex justify-center">
        <h1>{Props.IsSpecial ? "yes" : "no"}</h1>
      </div>
      <div className="flex justify-center">
        <h1>
          {Props.Tags.Spicy ? "*Spicy" : ""}
          {Props.Tags.Raw ? "*Raw" : ""}
          {Props.Tags.Allergens ? "*Alergens" : ""}
        </h1>
      </div>
      <div>
        {Props.Ingredients.length < 14 ? (
          <h1>{Props.Ingredients}</h1>
        ) : (
          <h1
            className="cursor-pointer"
            onClick={() => window.alert(Props.Ingredients)}
          >
            {Props.Ingredients.slice(0, 14) + "..."}
          </h1>
        )}
      </div>
      <div className="flex justify-center">{Props.Type}</div>
      <div className="text-slate-100 ml-4">
        <button
          className="editBtn bg-slate-400"
          // onClick={() =>
          //   setShowEditModal({ show: true, css: { display: "flex" } })
          // }
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

export default FoodCard;
