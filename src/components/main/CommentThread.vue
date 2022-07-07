<template>
  <div class="container">
    <div class="profile-pic"><img :src="comment.infoUser.imageProfil" alt=""></div>
        <div class="comment">
            <p class="infos">{{comment.infoUser.firstName}} {{comment.infoUser.lastName}} <span class="date">( {{comment.date}} )</span></p>
            <p>{{comment.content}}</p>
        </div>
        <div class="container-edit-btn">
            <button title="supprimer le commentaire" class="btn delete" v-if="isCreator" @click="deleteComment"> X </button>
            <button title="editer le commentaire" class="btn edit" v-if="isCreator" @click="modifyComment"> ... </button>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isCreator: this.comment.isCreator,
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        }
    },
    props: {
        comment: {
            type: Object
        }
    },
    methods: {
        deleteComment() {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
                body: JSON.stringify({userId: this.userId})
            }
            fetch(`http://localhost:3000/api/posts/${this.comment.postId}/comments/${this.comment._id}`, requestOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data)
                this.$emit('commentDeleted')
            })
        },
        modifyComment() {
            console.log(this.userId)
            console.log(this.comment)
            
        }
    },
    emits: ['commentDeleted']
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
    background-color: #4E5166;
    margin: 0 10px;
    border-radius: 30px;       
}
.profile-pic img {
    height: 100%;
    width: 100%;
    border-radius: 50px;
}
.comment {
    width: 80%;
    background-color: white;
    border-radius: 11px;
    padding: 5px;
    margin: 5px;
}
.comment p {
    margin: 3px 10px;
    text-align: left;
}
.infos {
    font-size: 12px;
}
.date {
    color: #FD2D01;
}
.container-edit-btn {
    display: flex;
    flex-flow: column;
}
.btn {
    border-radius: 30px;
    border: solid 1px black;
    cursor: pointer;
    margin: 10px 0;
}


</style>