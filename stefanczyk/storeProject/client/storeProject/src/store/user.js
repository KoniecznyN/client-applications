import { loginUser, logoutUser, getCurrentUser } from "@/api";

const user = {
  state() {
    return {
      userObject: null,
      userLoading: false,
    };
  },
  mutations: {
    SET_CURRENT_USER(state, userObject) {
      state.userObject = userObject;
    },
    SET_CURRENT_USER_LOADING(state, userLoading) {
      state.userLoading = userLoading;
    },
  },
  getters: {
    GET_CURRENT_USER(state) {
      return state.userObject;
    },
    GET_CURRENT_USER_LOADING(state) {
      return state.userLoading;
    },
  },
  actions: {
    LOGIN_USER({ commit, getters }, { email, password }) {
      commit("SET_CURRENT_USER_LOADING", true);

      return loginUser({ email, password })
        .then((userObject) => {
          if (userObject.email) {
            commit("SET_CURRENT_USER", userObject);
          }
        })
        .finally(() => {
          commit("SET_CURRENT_USER_LOADING", false);
        });
    },
    LOGOUT_USER({ commit }) {
      commit("SET_CURRENT_USER", null);
      return logoutUser();
    },
    FETCH_CURRENT_USER({ commit, getters }) {
      if (getters.GET_CURRENT_USER) {
        console.log("jest user w store");
        return Promise.resolve();
      } else {
        commit("SET_CURRENT_USER_LOADING", true);
        return getCurrentUser()
          .then((userObject) => {
            console.log("biorę usera z serwera", userObject);
            if (userObject.email) {
              commit("SET_CURRENT_USER", userObject);
            }
          })
          .finally(() => {
            commit("SET_CURRENT_USER_LOADING", false);
          });
      }
    },
  },
};

export default user;
