<template>
    <div class="backdrop" @click.self="$emit('close')" >
        <div class="modal-window">
            <h1>Créer une publication</h1>
            <textarea name="post" id="post" cols="30" rows="10" placeholder="Quoi de neuf ?" @click="resetText" v-model="message"></textarea>
            <div class="container-btn">
                <input type="file" class="add-image" ref="imageInput" @change="onChangeFile" name="IMAGE">
                <button class="modal-btn" @click="publish" >publier</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            message: "",
            userId: localStorage.getItem("userId"),
            token : localStorage.getItem("token"),
            imageUrl: null,
            file: undefined,
        }
    },
    methods: {
        onChangeFile(e) {
            this.file = e.target.files[0]
            console.log(this.file)
        },
        resetText() {
            if (this.message === "Quoi de neuf à nous raconter ?") {
            this.message=''
            }
        },
        publish() {
            const formData = new FormData()
            formData.append("content", this.message)
            formData.append("userId", this.userId) // probleme de secu
            if (this.file ) {
                formData.append("IMAGE", this.file )}
            const requestOptions = {
            method: "POST",
            headers: { "Authorization": `bearer ${this.token}` },
            body: formData,
           
            };
            fetch("http://localhost:3000/api/posts", requestOptions)
            .then((response) => response.json())
            .then((data) =>  {
                console.log(data)
                this.$emit('close')
            }
            )
            .catch((error) => console.log(error))
           
        }
    }, 

}
</script>

<style scoped>
   .backdrop {
    position: absolute;
    left:0;
    top: 0;
    z-index: 4;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.901);
   } 
   .modal-window {
    display: flex;
    margin: 20% auto;
    flex-flow: column wrap;
    height: auto;
    width: 50%;
   }
   .container-btn {
        display: flex;
        width: 100%;
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
    width: 100%
    
   }
    @media (max-width: 750px) {
        .modal-window {
            width: 80%;
        }
       
    }
</style>