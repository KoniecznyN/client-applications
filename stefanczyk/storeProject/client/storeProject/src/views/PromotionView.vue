<template>
  <div>
    <Header></Header>
    <div v-show="!isLoading" v-for="item in promotionItems" :key="item.id">
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
  import Footer from "@/components/Footer.vue";
  export default {
    components: { Header, Loader, Footer },
    created(){
      this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id)
    },
    computed: {
      promotion(){
        return this.$store.getters.GET_PROMOTION_OBJECT
      },
      promotionItems(){
        const promotionItems = this.$store.getters.GET_PROMOTION_OBJECT
        return promotionItems.items;
      },
      isLoading(){
        return this.$store.getters.GET_PROMOTION_LOADING;
      }
    }
  }
</script>

<style scoped>

</style>
