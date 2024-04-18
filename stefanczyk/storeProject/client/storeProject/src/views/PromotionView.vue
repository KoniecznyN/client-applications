<template>
  <div>
    <Header></Header>
    <div class="promotion">
      <PromotionTile class="promotionTile" v-bind:promotion="promotion"></PromotionTile>
    </div>
    <div class="item" v-show="!isLoading" v-for="item in promotionItems" :key="item.id">
      {{ item.name }}
      {{ item.price }}
      {{ item.category }}
    </div>
    <Loader v-show="isLoading"></Loader>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import PromotionTile from "@/components/PromotionTile.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: { Header, Loader, Footer, PromotionTile },
  created() {
    this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id)
  },
  computed: {
    promotion() {
      return this.$store.getters.GET_PROMOTION_OBJECT
    },
    promotionItems() {
      const promotionItems = this.$store.getters.GET_PROMOTION_OBJECT
      return promotionItems.items;
    },
    isLoading() {
      return this.$store.getters.GET_PROMOTION_LOADING;
    }
  }
}
</script>

<style scoped>
.promotion {
  margin: 0;
  padding: 0;
}

.item {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}

.promotionTile {
  width: 100vw;
  border: none;
  background-color: lightblue;
}
</style>
