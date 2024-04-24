<template>
  <main>
    <div class="promotion">
      <PromotionTile
        class="promotionTile"
        v-bind:promotion="promotion"
      ></PromotionTile>
    </div>
    <div class="items">
      <div
        class="item"
        v-show="!isLoading"
        v-for="item in promotionItems"
        :key="item.id"
      >
        <img :src="`../assets/photos/${item.image}`" alt="" />
        {{ item.name }}
        {{ item.price }}
        {{ item.category }}
      </div>
    </div>
    <Loader v-show="isLoading"></Loader>
  </main>
</template>

<script>
import Loader from "@/components/Loader.vue";
import PromotionTile from "@/components/PromotionTile.vue";
export default {
  components: { Loader, PromotionTile },
  created() {
    this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
  },
  computed: {
    promotion() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    },
    promotionItems() {
      const promotionItems = this.$store.getters.GET_PROMOTION_OBJECT;
      return promotionItems.items;
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

.items {
  width: max-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  width: 100px;
  height: 200px;
  margin: 10px;
  border: 1px solid black;
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
