<template>
  <main>
    <div class="promotion">
      <PromotionTile
        class="promotionTile"
        v-bind:promotion="promotion"
      ></PromotionTile>
    </div>
    <div class="products">
      <RouterLink
        v-for="product in promotionProducts"
        :to="`/products/${product.id}`"
      >
        <ProductTile :product="product" />
      </RouterLink>
    </div>
    <Loader v-show="isLoading"></Loader>
  </main>
</template>

<script>
import Loader from "@/components/Loader.vue";
import PromotionTile from "@/components/PromotionTile.vue";
import ProductTile from "@/components/ProductTile.vue";
export default {
  components: { Loader, PromotionTile, ProductTile },
  created() {
    this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
  },
  computed: {
    promotion() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    },
    promotionProducts() {
      const promotionProducts = this.$store.getters.GET_PROMOTION_OBJECT;
      return promotionProducts.items;
    },
    isLoading() {
      return this.$store.getters.GET_PROMOTION_LOADING;
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.products {
  width: max-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  height: 70%;
}

.promotionTile {
  width: 100vw;
  border: none;
}
</style>
