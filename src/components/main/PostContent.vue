<template>
    <div class="post">
        <div class="container-photo"><img class="photo-profil" :src="postData.user.imageProfil" ></div>
        <div class="content">
            <p class="infos">{{postData.user.firstName}} {{postData.user.lastName}} <span class="date">( {{postData.date}})</span> </p>
            <img class="post-image" :src="postData.imageUrl" >
            <div class="container-text-like">
                <p class="text-content">{{this.postData.content}}</p>
                <font-awesome-icon class="icon-like" icon="fa-solid fa-thumbs-up" ref="btnLike" @click="toggleLike" :class="{ liked: isLiked }" />
            </div>
        </div >
        <div class="container-edit-btn">
        <button title="supprimer la publication" class="btn delete" v-if="isCreator" @click="deletePost"> X </button>
        <button title="editer la publication" class="btn edit" v-if="isCreator" @click="modifyPost"> ... </button>
        </div>
    </div>
    <div class="button-post">
        <ButtonPost value="J'aime" @click="toggleLike" />
        <ButtonPost value="Je commente" @click="focusComment" />
    </div>
    <section class="comment-container">
        <div class="container-photo"> <img class="photo-profil"  :src="this.imageUrl" > </div>
        <input type="text" ref="comment" placeholder="Ecrivez un commentaire ..." @keyup.enter="publishComment">
    </section>
    
    <div class="comment-space">
        <CommentThread v-for="comment of this.comments" v-bind:key="comment._id" :comment="comment" @commentDeleted="refreshComments" />
    </div>
    <ModalPostEdit v-if="showModalPostEdit" @close="showModalPostEdit = false"  @postUpdate="refreshPost" :postData="postData" />
</template>

<script>
import ButtonPost from './ButtonPost.vue'
import CommentThread from './CommentThread.vue'
import ModalPostEdit from "./ModalPostEdit.vue"
export default {
    data() {
        return {
            isAdmin: false,
            postData: this.post,
            gotComments : false,
            isCreator: this.post.isCreator,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            isLiked: this.post.isLiked,
            imageUrl: localStorage.getItem('imageProfil'),
            showModalPostEdit: false,
            comments:[]
        }
    },
    props: {
        post: {
            type: Object,
        },
    }
    ,
    components: {ButtonPost, CommentThread, ModalPostEdit},
    methods : {
        fillComments() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
            }
        fetch(`http://localhost:3000/api/user/${this.userId}`,requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.isAdmin === true) {
                this.isAdmin = true
                }
            });
        fetch(`http://localhost:3000/api/posts/${this.post._id}/comments`, requestOptions)
        .then(response => response.json())
        .then(data => {
            for ( let comment of data) {
                if (comment.postId === this.post._id) {
                    fetch(`http://localhost:3000/api/user/${comment.userId}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        comment.infoUser = data
                        if (comment.userId === this.userId || this.isAdmin ===  true) {
                            comment.isCreator = true;
                        } else {
                            comment.isCreator = false;
                        }
                        this.comments.push(comment)
                        this.comments.sort(function (a, b) {
                            return b.chrono - a.chrono;
                        });
                    })
                    
                }
            }
        })
        },
        refreshPost(payload) {
            console.log('payload', payload);
            if(payload.message) {
                this.postData.content = payload.message;
            }
            if (payload.image) {
                 this.postData.imageUrl = payload.image
            }
            this.postData.chrono = payload.chrono
            this.postData.date = payload.date
            console.log(this.postData)
        },
        toggleLike() {
            console.log(this.post._id)
            console.log(this.token)
            const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
            body: JSON.stringify({userId: this.userId, postId: this.post._id})
            }
            fetch(`http://localhost:3000/api/posts/${this.post._id}/like`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.isLiked = !this.isLiked
            })
            
        },
        focusComment() {
            this.$refs.comment.focus()
        },
        publishComment() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
                body: JSON.stringify({userId: this.userId, content: this.$refs.comment.value, })
            }
        
            fetch(`http://localhost:3000/api/posts/${this.post._id}/comments` ,requestOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data)
                this.$refs.comment.value = ""
                this.fillComments()
            })
        },
        modifyPost() {
           this.showModalPostEdit = true
        },
        deletePost() {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
                body: JSON.stringify({userId: this.userId})
            }
            fetch(`http://localhost:3000/api/posts/${this.post._id}`, requestOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data)
                this.$emit('postDeleted')
            })
        },
        refreshComments() {
            this.comments = [] 
            this.fillComments()
        }
    },
    mounted() {
       this.fillComments()
    },
    emits: ["postDeleted"]
    
}
</script>
<style scoped>
    .post {
        display: flex;
        padding-top: 20px;
        border-top: #fd2b0137 solid 1px;
        justify-content: center;
    }
    .post-image {
        max-width: 50%;
        max-height: 300px;
    }
    .comment-container {
        display: flex;
        padding: 5px 0;
        justify-content: center;
    }
    .comment-container input{
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
    .container-photo {
        height: 30px;
        width:30px;
        background-color: #4E5166;
        margin:  10px;
        border-radius: 30px;
    }
    .photo-profil {
        height: 100%;
        width: 100%;
        border-radius: 25px;
    }
    .button-post {
        display: flex;
    }
    .liked {
        color: blue;
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
    .container-edit-btn {
        display: flex;
        margin: 0;
        height: 10%;
        width: 10%;
    }
    .btn {
        border-radius: 20px;
        border: black solid 1px;
        cursor: pointer;
        margin: 5px;
    }
    .btn:hover {
        color: white;
        background-color: #4E5166;
    }
    .text-content {
        width: 80%;
    }
    .icon-like {
        width: 20%;
        margin: auto;
     
    }
    .container-text-like {
        display: flex;
    }
    .container-text-like svg {
       margin: auto auto 5px auto
    }
    @media (max-width: 750px) {
        .post {
            width: 100%;
        }
        .content {
            width: 60%;
        }
       
        .container-edit-btn {
            display: flex;
            flex-flow: column;
            justify-content: space-around;
        }
        .btn {
            width: 100%;
            margin-bottom: 50px;
        }
        .text-content {
            width: 70%;
            font-size: 12px;
        }
        .comment-container {
            width: 80%;
            margin: auto;
        }
    }
</style>