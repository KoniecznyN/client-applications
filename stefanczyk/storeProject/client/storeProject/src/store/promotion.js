import { getPromotion, getProduct } from "@/api";

const promotion = {
  state() {
    return {
      promotionObject: {},
      promotionLoading: false,
      promotionError: null,
    };
  },
  mutations: {
    SET_PROMOTION_OBJECT(state, newPromotionObject) {
      state.promotionObject = newPromotionObject;
    },
    SET_PROMOTION_LOADING(state, newPromotionLoading) {
      state.promotionLoading = newPromotionLoading;
    },
    SET_PROMOTION_ERROR(state, newPromotionError) {
      state.promotionError = newPromotionError;
    },
  },
  getters: {
    GET_PROMOTION_OBJECT(state) {
      return state.promotionObject;
    },
    GET_PROMOTION_LOADING(state) {
      return state.promotionLoading;
    },
    GET_PROMOTION_ERROR(state) {
      return state.promotionError;
    },
  },
  actions: {
    FETCH_PROMOTION({ state, commit, getters }, promotionId) {
      commit("SET_PROMOTION_LOADING", true);
      commit("SET_PROMOTION_OBJECT", {});

      const handleError = () => {
        commit("SET_PROMOTION_ERROR", "server error!!!");
        commit("SET_PROMOTION_LOADING", false);
      };

      const promotionsList = getters.GET_PROMOTIONS_LIST;
      const promotionFromStore = promotionsList.find(
        (element) => element.id == promotionId
      );

      const handlePromotion = (data) => {
        const fetchPromises = data.items.map((productId) =>
          getProduct(productId)
        );

        Promise.all(fetchPromises)
          .then((values) => {
            const returnObject = { ...data, items: values };
            commit("SET_PROMOTION_OBJECT", returnObject);
            commit("SET_PROMOTION_LOADING", false);
          })
          .catch(handleError);
      };

      if (promotionFromStore) {
        handlePromotion(promotionFromStore);
      } else {
        getPromotion(promotionId).then(handlePromotion).catch(handleError);
      }
    },
  },
};

export default promotion;
