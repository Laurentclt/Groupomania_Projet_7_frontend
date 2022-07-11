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
            <input type="file" class="form-control-file" name="IMAGE" accept="image/*" ref="myFile" @change="onChangeFile">
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
            token: localStorage.getItem("token"),
            imageUrl: null,
            file: undefined
        }
    },
    methods: {
        onChangeFile(e) {
            this.file = e.target.files[0]
            console.log(this.file)
        },
        updateChanges() {
            const userId = this.userId
            const formData = new FormData() 
            formData.append("firstName", this.firstname)
            formData.append("lastName", this.lastname)
            formData.append("email", this.email)
            if (this.file) {
                formData.append("IMAGE", this.file )
            }
            const requestOptions = {
            method: "PUT",
            headers: {  "Authorization" : `Bearer ${this.token}` },
            body: formData
            
            };
            fetch(`http://localhost:3000/api/user/${userId}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem("firstname", data.firstName),
                localStorage.setItem("lastname", data.lastName),
                localStorage.setItem("email", data.email)
                this.$emit('dataUpdated', {firstname: data.firstName, lastname: data.lastName, email: data.email, imageProfil: data.imageProfil})
                this.$emit('close')
            })
          
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
            
            };
            if (confirm("Êtes-vous sûr de vouloir supprimé votre compte ?") == true) {
                fetch(`http://localhost:3000/api/user/${userId}`, requestOptions)
                .then(
                    alert("compte supprimé"),
                    localStorage.clear(),
                    goToView()
                )
                
                } else {
                console.log("Opération annulée");

                }
        },
    }
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
   input, label{
    width: 50%;
    margin: 5px auto;
    text-align: left;
     
   }
   .container-btn {
    display: flex;
    width: 100%;
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
    @media (max-width: 750px) {
        .modal-window {
            width: 70%;
        }
    }
</style>