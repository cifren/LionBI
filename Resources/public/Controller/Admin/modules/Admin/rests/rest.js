import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export default reduxApi({
  restCollection: {
    url: `:url/:name.json`,
    transformer: transformers.array,
    options: {
      header: {
        "Accept": "application/json"
      }
    }
  },
  restCrud: {  //GET / UPDATE / DELETE except POST
    url: `:url/:name/:id.json`,
    crud: true,
    transformer: transformers.object,
    options: {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  },
  restPost: {
    url: `:url/:name.json`,
    transformer: transformers.object,
    options: {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  }
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend