<template>
  <div>
    <Header></Header>
    <RouterLink v-for="promotion in promotionsList" :to="`/promotion/${promotion.id}`" :key="promotion.id">
      <PromotionTile v-bind:promotion="promotion" />
    </RouterLink>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue";
import PromotionTile from "@/components/PromotionTile.vue"
export default {
  components: { Header, PromotionTile, Footer },
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS");
  },
  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    }
  }
}
</script>

<style lang="scss" scoped></style>
