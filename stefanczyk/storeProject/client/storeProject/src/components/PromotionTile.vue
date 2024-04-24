<template>
  <div :style="{ backgroundImage: 'url(' + this.promotion.image + ')' }">
    <h2>{{ this.promotion.header }}</h2>
    <h1>{{ this.promotion.description }}</h1>
  </div>
</template>

<script>
export default {
  name: "PromotionTile",
  props: { promotion: Object },
  computed: {},
};
</script>

<style scoped>
h1,
h2 {
  color: white;
  text-shadow: 0px 0px 5px black;
}
div {
  width: 900px;
  height: 150px;
  border: 4px solid black;
  text-align: center;
  color: black;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
