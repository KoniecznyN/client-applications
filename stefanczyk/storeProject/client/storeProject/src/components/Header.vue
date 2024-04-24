<template>
  <div class="header">
    <div class="leftPanel">
      <RouterLink to="/" exact class="link">Home</RouterLink>
      <RouterLink to="/about" class="link">About</RouterLink>
      <RouterLink to="/nnn" class="link">Not found</RouterLink>
    </div>
    <div class="rightPanel">
      <RouterLink to="/login" v-show="!user" class="link">Login</RouterLink>
      <RouterLink to="/register" v-show="!user" class="link"
        >Register</RouterLink
      >
      <p v-show="user" class="link">Obecnie zalogowany: {{ user.email }}</p>
      <p @click="logout" class="link" v-show="user">Logout</p>
      <!-- <p style="color: white" @click="logout" v-show="user">Logout</p> -->
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  computed: {
    user() {
      if (this.$store.getters.GET_CURRENT_USER) {
        return this.$store.getters.GET_CURRENT_USER;
      } else return "";
    },
    userLoading() {
      return this.$store.getters.GET_CURRENT_USER_LOADING;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT_USER").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.header {
  background-color: black;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  color: white;
  margin: 10px;
  transition: 0.5s;
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 900;
  padding: 5px;
}

.link:hover {
  background-color: rgb(46, 46, 46);
  cursor: pointer;
}

.leftPanel,
.rightPanel {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
