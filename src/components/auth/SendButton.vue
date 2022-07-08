<template>
    <button class="sendBtn" @click="action" >{{ message }}</button>
</template>

<script>
export default {
    props: {
        message: {
            type : String,
            default : "error"
        },
        action: {
            type : Function,
        }
    }
}
</script>

<style>
.sendBtn {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 11px;
    background-color: #4E5166 ;
    color: white;
}
</style>