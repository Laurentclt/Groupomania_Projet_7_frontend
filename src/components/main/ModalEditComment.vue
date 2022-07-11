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
                this.$emit('commentUpdate', { message: this.message, chrono: data.chrono, date: data.date});
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
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.901);
   } 
   .modal-window {
    display: flex;
    margin: 20% auto;
    flex-flow: column wrap;
    height: auto;
    width: 50%;
    border: solid 1px #fd2b01ae;
    padding: 20px;
    border-radius: 11px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.278) ;
   }
   .container-btn {
        display: flex;
   }
   .modal-btn {
    padding: 5px;
    width: auto;
    border-radius: 20px;
    margin:5px auto;
    background-color: #FD2D01;
    color: white;
    cursor: pointer;
   }
   .add-image {
    padding: 10px;
    
   }
   @media (max-width: 750px) {
        .modal-window {
            width: 70%;
        }
    }
</style>