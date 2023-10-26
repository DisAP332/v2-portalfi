import axios, { AxiosResponse } from "axios";
import Storage from "./storage";
import format from "./crudFormater";
import { SortedArray } from "typescript";

interface IResult {
  success: boolean;
  data: object;
}

let result: IResult;

const server = "http://localhost:8080";

// ************* response handling ************* //

function handleResponse(res: AxiosResponse) {
  if (res.data.auth === false) {
    window.alert("token has expired. please log back in");
    result = {
      ...result,
      success: false,
    };
  }
  if (res.data.success === false) {
    window.alert(res.data.response);
    result = {
      ...result,
      success: false,
    };
  } else {
    result = {
      data: res.data.response.data,
      success: true,
    };
  }
}

// *************** crud functions *************** //

async function Delete(id: string, requested: string) {
  try {
    await axios
      .delete(`${server}/${requested}/${id}`, {
        headers: {
          authorization: Storage.getItem("token"),
          user: Storage.getItem("user"),
        },
      })
      .then((res) => {
        handleResponse(res);
      });
  } catch (error) {
    console.log(error);
  }
  return result;
}

async function Update(id: string, requested: string, data: object) {
  let formatedData = format(requested, data);
  try {
    await axios
      .put(
        `${server}/${requested}/${id}`,
        { Data: formatedData },
        {
          headers: {
            authorization: Storage.getItem("token"),
            user: Storage.getItem("user"),
          },
        }
      )
      .then((res) => {
        handleResponse(res);
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
  try {
    let formatedData = format(requested, data);
    await axios
      .post(
        `${server}/${requested}`,
        { Data: formatedData },
        {
          headers: {
            authorization: Storage.getItem("token"),
            user: Storage.getItem("user"),
          },
        }
      )
      .then((res) => {
        handleResponse(res);
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

async function publish(requested: string, data: object) {
  let formatedData = format(requested, data);
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
    await axios
      .put(
        `${server}/site`,
        { Data },
        {
          headers: {
            authorization: Storage.getItem("token"),
            user: Storage.getItem("user"),
          },
        }
      )
      .then((res) => console.log(res));
  } else {
    console.log("update route");
    console.log(siteDataExists[0]._id);
    await axios
      .put(
        `${server}/site/${siteDataExists[0]._id}`,
        { Data },
        {
          headers: {
            authorization: Storage.getItem("token"),
            user: Storage.getItem("user"),
          },
        }
      )
      .then((res) => console.log(res));
  }
}

const crudActions = { Create, Delete, Update, sortPublishData };

export default crudActions;
