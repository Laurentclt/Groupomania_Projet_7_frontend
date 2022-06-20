<template>
    <div class="backdrop" @click.self="closeWindow" >
        <div class="modal-window">
            <h1>Créer une publication</h1>
            <textarea name="post" id="post" cols="30" rows="10" @click="resetText" v-model="message"></textarea>
            <div class="container-btn">
                <button class="modal-btn">ajouter image</button>
                <button class="modal-btn">publier</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "Quoi de neuf à nous raconter ?",
           
        }
    }, methods: {
        resetText() {
            this.message=''
        },
        closeWindow() {
            console.log("fenêtre fermée")
        }
    }, props: {
        isActive: {
            type: Boolean,
            default:false,
        },
    }
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
    background-color: rgba(255, 255, 255, 0.801);
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
</style>