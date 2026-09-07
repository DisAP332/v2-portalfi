import axios, { AxiosResponse } from "axios";
import Storage from "./storage";

interface IResult {
  success: boolean;
  data: object;
}

const server = process.env.NEXT_PUBLIC_API_URL;

// the auth token lives in an HttpOnly cookie now - the browser attaches it
// automatically on same-site/allowed-origin requests, but only if we ask
// it to via withCredentials. There's nothing to read or attach manually
// here anymore.
axios.defaults.withCredentials = true;

// ************* response handling ************* //

function handleResponse(res: AxiosResponse): IResult {
  if (res.data.auth === false) {
    window.alert("token has expired. please log back in");
    return { success: false, data: {} };
  }
  if (res.data.success === false) {
    window.alert(res.data.response);
    return { success: false, data: {} };
  }
  return {
    data: res.data.response.data,
    success: true,
  };
}

// *************** crud functions *************** //

async function Delete(id: string, requested: string) {
  let result: IResult | undefined;
  try {
    await axios.delete(`${server}/${requested}/${id}`).then((res) => {
      result = handleResponse(res);
    });
  } catch (error) {
    console.log(error);
  }
  return result;
}

async function Update(id: string, requested: string, data: object) {
  let result: IResult = { success: false, data: {} };
  try {
    await axios
      .put(`${server}/${requested}/${id}`, { Data: data })
      .then((res) => {
        result = handleResponse(res);
      });
  } catch (error) {
    window.alert(
      `Make sure all required fields contain data / in correct format. ${error}`
    );
    result = {
      success: false,
      data: {},
    };
  }
  return result;
}

async function Create(requested: string, data: object) {
  let result: IResult = { success: false, data: {} };
  try {
    await axios.post(`${server}/${requested}`, { Data: data }).then((res) => {
      result = handleResponse(res);
    });
  } catch (error) {
    window.alert(
      `Make sure all required fields contain data / in correct format. ${error}`
    );
    result = {
      success: false,
      data: {},
    };
  }
  return result;
}

// ****** publish data sorting ******* //

function sortEventsByDate(events: [{ Date: string }]) {
  // this will sort the dates from closest to present day to furthest.
  events.sort(
    (a, b) =>
      Number(a.Date.replace(/-/g, "")) - Number(b.Date.replace(/-/g, ""))
  );
  return events;
}

function sortDrinksByCatagory(drinks: [{ Category: string }]) {
  interface ISortedDrinks {
    cocktails: Array<object>;
    seltzers: Array<object>;
    drafts: Array<object>;
    beers: Array<object>;
  }

  let sortedDrinks: ISortedDrinks;

  sortedDrinks = {
    cocktails: [],
    seltzers: [],
    drafts: [],
    beers: [],
  };

  for (let i = 0; i < drinks.length; i++) {
    if (drinks[i].Category === "cocktail") {
      sortedDrinks.cocktails.push(drinks[i]);
    }
    if (drinks[i].Category === "seltzer") {
      sortedDrinks.seltzers.push(drinks[i]);
    }
    if (drinks[i].Category === "draft") {
      sortedDrinks.drafts.push(drinks[i]);
    }
    if (drinks[i].Category === "beer") {
      sortedDrinks.beers.push(drinks[i]);
    }
  }
  return sortedDrinks;
}

class publishedData {
  Events: Array<object>;
  Drinks: object;
  constructor(Events: Array<object>, Drinks: object) {
    this.Events = Events;
    this.Drinks = Drinks;
  }
}

async function sortPublishData(data: {
  events: [{ Date: string }];
  drinks: [{ Category: string }];
}) {
  let events = sortEventsByDate(data.events);
  let drinks = sortDrinksByCatagory(data.drinks);
  const Data = new publishedData(events, drinks);
  const siteDataExists = Storage.getItem("siteData");
  if (!siteDataExists) {
    console.log("creation route");
    await axios.put(`${server}/site`, { Data }).then((res) => console.log(res));
  } else {
    console.log("update route");
    console.log(siteDataExists[0]._id);
    await axios
      .put(`${server}/site/${siteDataExists[0]._id}`, { Data })
      .then((res) => console.log(res));
  }
}

const crudActions = { Create, Delete, Update, sortPublishData };

export default crudActions;
