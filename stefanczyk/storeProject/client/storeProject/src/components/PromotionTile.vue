<template>
    <div>
        <h3>{{ this.promotion.header }}</h3>
        <h2>{{ this.promotion.description }}</h2>
    </div>
</template>

<script>
export default {
    name: "PromotionTile",
    props: { promotion: Object },
    computed: {

    }

}
</script>

<style scoped>
    div {
        width: 600px;
        height: 100px;
        border: 4px solid black;
        text-align: center;
        color: black;
    }
</style>