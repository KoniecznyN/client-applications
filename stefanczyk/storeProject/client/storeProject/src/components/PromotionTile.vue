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
    
</style>