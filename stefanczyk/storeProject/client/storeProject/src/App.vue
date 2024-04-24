<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  beforeCreate() {
    this.$store.dispatch("FETCH_CURRENT_USER");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped></style>
