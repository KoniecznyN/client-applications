import { createStore } from "vuex";
import promotions from "./promotions";
import promotion from "./promotion";
import user from "./user";

const modules = {
  promotions,
  promotion,
  user,
  // kolejne moduły
};

const store = createStore({ modules });

export default store;
