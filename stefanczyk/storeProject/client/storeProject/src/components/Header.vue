<template>
    <div class="header">
        <RouterLink to="/" exact class="link">Home</RouterLink>
        <RouterLink to="/about" class="link">About</RouterLink>
        <RouterLink to="/nnn" class="link">Not found</RouterLink>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.header {
    background-color: black;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: start;
    align-items: center;
}

.link {
    color: white;
    margin: 10px;
    transition: .5s;
    border-radius: 10px;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 900;
}

.link:hover {
    background-color: grey;
}
</style>