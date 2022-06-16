<template>
    <button class="modalBtn">{{name}}</button>
</template>

<script>
export default {
    props: ["name"]
}
</script>

<style>
.modalBtn {
    color: white;
    width: 50%;
    height: 8vh;
    background-color: #4E5166;
    font-family: 'Lato', sans-serif;
    font-size: 120%;
    cursor: pointer;
    border-top-right-radius: 11px;
    border-top-left-radius: 11px;

}
</style>