<template>
  <div v-show="exists">
    <h1>Info</h1>
    <p>User już istnieje</p>
  </div>
  <form @submit="onSubmit" v-show="!exists && !loading">
    <h1>REJESTRACJA</h1>
    <div v-show="error">{{ error }}</div>
    <input placeholder="email" v-model="email" />
    <input placeholder="password" type="password" v-model="password" />
    <button type="submit" :disabled="disabled">register</button>
  </form>
  <Loader v-show="loading"></Loader>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { registerUser } from "@/api/index.js";
export default {
  data() {
    return {
      error: "",
      email: "",
      password: "",
      exists: false,
      loading: false,
    };
  },
  components: { Loader },
  computed: {
    disabled() {
      return this.email.length < 3;
    },
  },
  methods: {
    onSubmit(e) {
      this.loading = true;
      e.preventDefault();
      if (this.password.length < 3) {
        this.error = "hasło musi mieć co najmniej 3 znaki";
        this.loading = false;
      } else {
        this.error = "";
        registerUser({ email: this.email, password: this.password })
          .then((data) => {
            this.exists = true;
            this.registered = true;
          })
          .catch((err) => {
            this.registered = false;
            this.exists = false;
            this.error = "user nie zarejestrowany";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 40px;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 300px;
}

input {
  width: 250px;
  height: 25px;
  margin: 10px;
  padding: 0;
}
button {
  width: 250px;
  height: 25px;
  margin: 10px;
}
</style>
