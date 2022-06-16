<template>
    <button class="sendBtn">{{ message }}</button>
</template>

<script>
export default {
    props: {
        message: {
            type : String,
            default : "error"
        }
    }
}
</script>

<style>
.sendBtn {
    padding: 10px 20px;
    border-radius: 11px;
    background-color: #4E5166 ;
    color: white;
}
</style>