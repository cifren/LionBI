import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export const OPTIONS = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };
export default reduxApi({
  restCollection: {
    url: `:url/:name.json`,
    transformer: transformers.array,
    options: OPTIONS
  },
  restGet: { 
    url: `:url/:name/:id.json`,
    transformer: transformers.object,
    options: OPTIONS
  },
  restPut: {
    url: `:url/:name/:id.json`,
    transformer: transformers.object,
    options: {...OPTIONS, method: "put"}
  },
  restDelete: {
    url: `:url/:name/:id.json`,
    transformer: transformers.object,
    options: {...OPTIONS, method: "delete"}
  },
  restPost: {
    url: `:url/:name.json`,
    transformer: transformers.object,
    options: {...OPTIONS, method: "post"}
  }
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend