<template>
    <article>
    <div class="profile-pic">img<img src="" alt=""></div>
    <div class="content">
        <p>user name + (date)</p>
        <p>content : lorem ipsum dddddddddd ddddddddddd ddddddddd ddddddddddd</p>
    </div>
    </article>
    <div class="button-post">
        <ButtonPost value="J'aime" @click="toggleLike" :class="{ liked: isLiked }" />
        <ButtonPost value="Je commente" @click="comment" />
    </div>
    <section class="comment">
        <div class="profile-pic">img</div>
        <input type="text" ref="comment" placeholder="Ecrivez un commentaire ...">
    </section>
    
    <div class="comment-space" v-if="gotComments"><CommentThread /></div>
</template>

<script>
import ButtonPost from './ButtonPost.vue'
import CommentThread from './CommentThread.vue'
export default {
    data() {
        return {
            isLiked : false,
            gotComments : true
        }
    },
    components: {ButtonPost, CommentThread},
    methods : {
        toggleLike() {
            this.isLiked = !this.isLiked
        },
        comment() {
            this.$refs.comment.focus()
        }
    }
    
}
</script>
<style scoped>
    article {
        display: flex;
        padding-top: 20px;
        border-top: #fd2b0137 solid 1px;
        justify-content: center;
    }
    .comment {
        display: flex;
        padding: 5px 0;
        justify-content: center;
    }
    .comment input{
        margin: 10px 0;
        width: 80%;
        border-radius: 11px;
        padding: 5px;
    }
    .content{
        background-color: white;
        width: 80%;
        margin: 0 ;
        border-radius: 11px;
    }
    .content p {
        padding: 10px;
        text-align: left;
        margin: 0;
    }
    .profile-pic {
        height: 30px;
        width:30px;
        background-color: #FD2D01;
        margin:  10px;
        border-radius: 30px;
    }
    .button-post {
        display: flex;
    }
    .liked {
        background-color: #FD2D01;
        color: white;
    }
    .comment-space {
        height: auto;
        width: 100%;
    }
</style>