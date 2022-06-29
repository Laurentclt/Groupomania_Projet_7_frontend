<template>
    <article>
    <div class="profile-pic">img<img src="" alt=""></div>
    <div class="content">
        <p class="infos">{{post.user.firstName}} {{post.user.lastName}} <span class="date">( {{post.date}})</span> </p>
        <p class="text-content">{{post.content}}</p>
    </div>
     <button title="supprimer la publication" class="btn delete" v-if="isCreator"> X </button>
     <button title="editer la publication" class="btn edit" v-if="isCreator"> ... </button>
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
            gotComments : false,
            isCreator: false,
        }
    },
    props: {
        post: {
            type: Object,
        },
        userId: {
            type: String
        }
    }
    ,
    components: {ButtonPost, CommentThread},
    methods : {
        toggleLike() {
            this.isLiked = !this.isLiked
        },
        comment() {
            this.$refs.comment.focus()
        },
        checkCreator() {
            if (this.userId === localStorage.getItem("userId")) {
                this.isCreator = true
            }
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
        padding: 0 5px;
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
    .infos {
        font-size: 12px;
    }
    .date {
        color: red;
        font-size: 12px;
    }
    .btn {
        height: 30%;
        justify-content: flex-end;
    }
</style>