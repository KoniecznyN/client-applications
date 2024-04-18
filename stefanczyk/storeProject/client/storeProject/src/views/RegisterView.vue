<template>
    <div>
        <Header></Header>
        <div v-show="exists">
            <h1>Info</h1>
            <p>User już istnieje</p>
        </div>
        <form @submit="onSubmit" v-show="!exists && !loading">
            <div v-show="error">{{ error }} </div>
            <input v-model="email" />
            <input type="password" v-model="password" />

            <button type="submit" :disabled="disabled">register</button>
        </form>
        <Loader v-show="loading"></Loader>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import { registerUser } from "@/api/index.js";
export default {
    data() {
        return {
            error: "",
            email: "",
            password: "",
            exists: false,
            loading: false
        };
    },
    components: { Header, Footer, Loader },
    computed: {
        disabled() {
            return this.email.length < 3;
        },
    },
    methods: {
        onSubmit(e) {
            this.loading = true
            e.preventDefault();
            if (this.password.length < 3) {
                this.error = "hasło musi mieć ... znaków";
            } else {
                this.error = "";
                console.log(this.email);
                console.log(this.password);
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
    }
}
</script>

<style scoped></style>