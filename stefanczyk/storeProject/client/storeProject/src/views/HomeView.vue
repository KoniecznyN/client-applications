<template>
  <main>
    <RouterLink
      v-for="promotion in promotionsList"
      :to="`/promotion/${promotion.id}`"
      :key="promotion.id"
    >
      <PromotionTile v-show="!isLoading" v-bind:promotion="promotion" />
    </RouterLink>
    <Loader v-show="isLoading"></Loader>
  </main>
</template>

<script>
import PromotionTile from "@/components/PromotionTile.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: { PromotionTile, Loader },
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS");
  },
  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    },
    isLoading() {
      return this.$store.getters.GET_PROMOTIONS_LOADING;
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

#1 {
  background-image: url("https://as1.ftcdn.net/v2/jpg/01/20/82/64/1000_F_120826407_VV1V7WOYTbrvLNgxDokcZqqQZMPp2wbO.jpg");
}
</style>
