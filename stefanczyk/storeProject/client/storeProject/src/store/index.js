import { createStore } from "vuex";
import promotions from "./promotions";
import promotion from "./promotion";

const modules = {
  promotions,
  promotion,
  // kolejne moduły
};

const store = createStore({ modules });

export default store;
