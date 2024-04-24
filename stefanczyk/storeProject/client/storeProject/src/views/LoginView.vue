<template>
  <div v-show="!loading">
    <form @submit="onSubmit">
      <h1>LOGIN</h1>
      <input placeholder="email" v-model="email" />
      <input placeholder="password" type="password" v-model="password" />
      <button type="submit" :disabled="disabled">Send</button>
    </form>
  </div>
  <Loader v-show="loading"></Loader>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  data() {
    return {
      error: "",
      email: "",
      password: "",
      exists: false,
      logged: false,
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
      this.$store
        .dispatch("LOGIN_USER", { email: this.email, password: this.password })
        .then(() => {
          const { email } = this.$store.getters.GET_CURRENT_USER;
          if (email) this.logged = true;
          else this.logged = false;
        })
        .catch(() => {
          this.error = "niepoprawne dane logowania";
          this.logged = false;
        })
        .finally(() => {
          this.$router.push("/");
          this.loading = false;
        });
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
