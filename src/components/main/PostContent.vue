<template>
    <article>
    <div class="profile-pic"><img src="" alt=""></div>
    <div class="content">
        <p>user name + (date)</p>
        <p>content : lorem ipsum ddddddddddddddddddddddddddddddddddddddddd</p>
    </div>
    </article>
    <div class="button-post">
        <ButtonPost value="J'aime" />
        <ButtonPost value="Je commente"/>
    </div>
</template>

<script>
import ButtonPost from './ButtonPost.vue'
export default {
    components: {ButtonPost}
    
}
</script>
<style scoped>
    article {
        display: flex;
        padding-top: 20px;
        border-top: #fd2b0137 solid 1px;
    }
    .content{
        background-color: white;
        width: 80%;
        margin: 0 auto;
        border-radius: 11px;
    }
    .content p {
        padding: 10px;
        text-align: left;
        margin: 0;
    }
    .profile-pic {
        height: 50px;
        width:50px;
        background-color: #FD2D01;
        margin: auto 10px;
        border-radius: 30px;
    }
    .button-post {
        display: flex;
    }
</style>