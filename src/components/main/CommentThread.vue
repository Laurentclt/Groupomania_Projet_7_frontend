<template>
  <div class="container">
    <div class="profile-pic"> img</div>
    <div class="comment">
        <p>name</p>
        <p>content comment</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    display: flex;
}
.profile-pic {
        height: 30px;
        width:30px;
        background-color: #FD2D01;
        margin: auto 10px;
        border-radius: 30px;
    }
.comment {
    width: 80%;
    background-color: white;
    border-radius: 11px;
    margin:  0 auto;
    padding: 5px;
}
.comment p {
    margin: 0;
    text-align: left;
}
</style>