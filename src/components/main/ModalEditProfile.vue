<template>
  <div class="backdrop" @click.self="$emit('close')" >
        <div class="modal-window">
            <h1>Editer le profil</h1>
            <label>Prénom :</label>
            <input type="text">
            <label>Nom :</label>
            <input type="text">
            <label>Email :</label>
            <input type="text">
            <label>Photo de profil :</label>
            <input type="file">
            <div class="container-btn">
                <button class="modal-btn" @click="deleteAccount">supprimer mon compte</button>
                <button class="modal-btn" @click="updateChanges">valider les changements</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        updateChanges() {
            console.log("changements effetcués")
        },
        deleteAccount() {
            if (confirm("Êtes-vous sûr de vouloir supprimé votre compte ?") == true) {
                console.log("compte supprimé");
                } else {
                console.log("Opération annulée");
}
            
        }
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
   input, label{
    width: 50%;
    margin: 5px auto;
    text-align: left;
     
   }
   .container-btn {
    display: flex;
   }
    .modal-btn {
    padding: 5px;
    width: auto;
    border-radius: 20px;
    margin: 10px auto;
    background-color: #FD2D01;
    color: white;
    cursor: pointer;
    justify-content: space-between;
   }
   
</style>