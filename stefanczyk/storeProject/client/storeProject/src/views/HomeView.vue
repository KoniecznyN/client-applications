<template>
  <div>
    <Header></Header>
    <RouterLink v-for="promotion in promotionsList" :to="`/promotion/${promotion.id}`" :key="promotion.id">
      <PromotionTile v-show="!isLoading" v-bind:promotion="promotion" />
    </RouterLink>
    <Loader v-show="isLoading"></Loader>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue";
import PromotionTile from "@/components/PromotionTile.vue";
import Loader from "@/components/Loader.vue"
export default {
  components: { Header, PromotionTile, Footer, Loader },
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS");
  },
  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    },
    isLoading(){
      return this.$store.getters.GET_PROMOTIONS_LOADING;
    }
  }
}
</script>

<style scoped></style>
