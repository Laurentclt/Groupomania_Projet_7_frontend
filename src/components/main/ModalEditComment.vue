<template>
    <div class="backdrop" @click.self="$emit('close')" >
        <div class="modal-window">
            <h1>Modifier le commentaire</h1>
            <textarea name="post" id="post" cols="30" rows="10"  v-model="message"></textarea>
            <div class="container-btn">
                <button class="modal-btn" @click="publish" >publier</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
    data() {
        return {
            message: this.commentData.content,
            userId: localStorage.getItem('userId'),
            file: undefined,
            token: localStorage.getItem('token')
        }
    },
    props: {
        commentData: {
            type: Object,
        },
    },
    methods: {
        publish() {
            console.log(this.commentData)
            const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${this.token}` },
            body: JSON.stringify({content: this.message}),
            }
            fetch(`http://localhost:3000/api/posts/${this.commentData.postId}/comments/${this.commentData._id}`, requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data)
                
                console.log(data.doc)
                this.$emit('commentUpdate', { message: this.message, chrono: data.doc.chrono, date: data.doc.date});
                this.$emit('close')
                })
            .catch((error) => console.log(error))
        }
    },
    
}
</script>


<style scoped>
   .backdrop {
    position: fixed;
    left:0;
    top: 0;
    z-index: 4;
    height:100vh;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.901);
   } 
   .modal-window {
    display: flex;
    margin: 20% auto;
    flex-flow: column wrap;
    height: 30%;
    width: 50%;
   }
   .container-btn {
        display: flex;
   }
   .modal-btn {
    padding: 5px;
    width: 15%;
    border-radius: 20px;
    margin:5px auto;
    background-color: #FD2D01;
    color: white;
    cursor: pointer;
   }
   .add-image {
    padding: 10px;
    
   }
</style>