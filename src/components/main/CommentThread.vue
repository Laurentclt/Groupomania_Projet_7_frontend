<template>
  <div class="container">
    <div class="profile-pic"> img</div>
    <div class="comment">
        <p>name</p>
        <p>content comment</p>
    </div>
  </div>
  <p class="answer">répondre</p>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    
}
.profile-pic {
        height: 30px;
        width:30px;
        background-color: #FD2D01;
        margin: 0 10px;
        border-radius: 30px;
        
    }
.comment {
    width: 80%;
    background-color: white;
    border-radius: 11px;
    padding: 5px;
}
.comment p {
    margin: 3px 10px;
    text-align: left;
}
.answer {
    text-align: left;
    margin: 0 auto;
    width: 70%;
    cursor: pointer;
}
</style>