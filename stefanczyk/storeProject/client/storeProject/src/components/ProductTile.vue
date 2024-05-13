<template>
  <div class="main">
    <p class="name">{{ this.product.name }}</p>
    <img class="image" :src="src" :alt="src" />
    <p class="cena">cena: {{ this.product.price }}zł</p>
    <div class="rate">
      <img src="../assets/photos/rate.png" :alt="rate" />
      <div class="fill" :style="{ width: rate }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductTile",
  props: { product: Object },
  computed: {
    rate() {
      let rate = parseFloat(this.product.rate);
      rate = (rate / 5) * 100;
      return `${rate}%`;
    },
    src() {
      let name = this.product.image.toString();
      const imageUrl = new URL(`../assets/photos/${name}`, import.meta.url)
        .href;
      return imageUrl;
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
  color: black;

  margin: 0;
}
.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 150px;
  height: 250px;
  border: 2px solid black;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 5px 5px 0px black;
}

.name {
  text-align: center;
  font-weight: 900;
  font-size: 20px;
  margin: 5px;
}

.image {
  width: 100%;
  height: 160px;
}

.rate {
  position: relative;
  width: 100%;
  height: 25px;
}

.rate > img {
  position: absolute;
  z-index: 2;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.fill {
  z-index: 1;
  background-color: yellow;
  height: 100%;
}

.cena {
  text-align: center;
  font-size: 15px;
}
</style>
