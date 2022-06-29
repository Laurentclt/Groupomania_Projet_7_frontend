<template>
  <div class="backdrop" @click.self="$emit('close')" >
        <div class="modal-window">
            <h1>Editer le profil</h1>
            <label>Prénom :</label>
            <input type="text" v-model="firstname">
            <label>Nom :</label>
            <input type="text" v-model="lastname">
            <label>Email :</label>
            <input type="text" v-model="email">
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
    data() {
        return {
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            email: localStorage.getItem("email"),
            userId : localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        }
    },
    methods: {
        updateChanges() {
            console.log("update enclenché")
            const userId = this.userId
            
            const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
            body: JSON.stringify({firstName: this.firstname, lastName: this.lastname, email: this.email, userId: userId})
            };
            fetch(`http://localhost:3000/api/user/${userId}`, requestOptions)
            .then(response => response.json())
            .then(
                localStorage.setItem("firstname", this.firstname),
                localStorage.setItem("lastname", this.lastname),
                localStorage.setItem("email", this.email),
                document.location.reload()
                )
          
            .catch(error => console.log("error", error))
            
        },
        deleteAccount() {
            const userId = this.userId
            const loginView = this.$router.push("/login")
            const goToView = function () {
                return loginView
            }
            const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
            body: JSON.stringify({userId: this.userId})
            };
            if (confirm("Êtes-vous sûr de vouloir supprimé votre compte ?") == true) {
                fetch(`http://localhost:3000/api/user/${userId}`, requestOptions)
                .then(
                    alert("compte supprimé"),
                    goToView()
                )
                
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