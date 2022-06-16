<template>
    <button>{{ value }}</button>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        }
    }
}
</script>

<style scoped>
    button {
        padding: 10px;
        border-radius: 20px;
        margin: 5px auto 10px auto;
        cursor: pointer;
        border: solid 1px #fd2b01;
    }
</style>