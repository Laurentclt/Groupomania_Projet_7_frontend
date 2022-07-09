<template>
    <div class="backdrop" @click.self="$emit('close')" >
        <div class="modal-window">
            <h1>Modifier la publication</h1>
            <textarea name="post" id="post" cols="30" rows="10" @click="resetText" v-model="message"></textarea>
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
            message: this.postData.content,
            userId: localStorage.getItem('userId'),
            file: undefined,
            token: localStorage.getItem('token')
        }
    },
    props: {
        postData: {
            type: Object,
        },
    },
    methods: {
       onChangeFile(e) {
            this.file = e.target.files[0]
            console.log(this.file)
        },
        publish() {
            const formData = new FormData()
            formData.append("content", this.message)
            if (this.file ) {
                formData.append("IMAGE", this.file )
            }
            
            const requestOptions = {
            method: "PUT",
            headers: { "Authorization": `bearer ${this.token}` },
            body: formData,
            }
            fetch(`http://localhost:3000/api/posts/${this.postData._id}`, requestOptions)
            .then(response => response.json())
            .then(data => { 
                this.message = data.doc.content
                console.log(data.doc)
                if (data.doc.imageUrl !== "") {
                this.file = data.doc.imageUrl
                this.$emit('postUpdate', { message: this.message, image: this.file, chrono: data.doc.chrono, date: data.doc.date});
                } else {
                    this.$emit('postUpdate', { message: this.message, chrono: data.doc.chrono, date: data.doc.date});
                }
                
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