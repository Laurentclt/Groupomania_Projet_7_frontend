<template>
    <header>
        <div class="left">
            <a href="/app">Accueil</a>
            <img class="photo-profil query" :src="this.imageProfil" @click="toggle" >
            <button class="toggle-btn-query" v-if="toggleOn" @click="disconnectUser">déconnexion</button>
        </div>
        <div class="middle">
            <picture>
            <source media="(min-width: 750px)" srcset="../../assets/icon-left-font-monochrome-black.png">
            <source media="(min-width: 0px)" srcset="../../assets/icon-black-mini.png">
            <img src="../../assets/icon-left-font-monochrome-black.png" alt="Logo Groupomania">
    </picture> 
        </div>
        <div class="right">
            <div class="profile-img" @click="toggle">
                <img class="photo-profil" :src="this.imageProfil" >
            </div>
            <div class="container-btn" v-if="toggleOn">
                <button class="toggle-btn"  @click="disconnectUser">déconnexion</button>
            </div>
            <div class="container-profile">
                <p class="full-name">{{firstname}} {{lastname}}</p>
                <button class="edit-btn" @click="editProfile" >éditer le profil</button>
            </div>
        </div>
    </header>
    <ModalEditProfile v-if="modalEdit" @close = "modalEdit = false" @dataUpdated="refreshData" />
</template>

<script>
import ModalEditProfile from './ModalEditProfile'
export default {
    components: {
        ModalEditProfile
    },
    data() {
        return {
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            imageProfil: localStorage.getItem("imageProfil"),
            modalEdit: false,
            toggleOn: false,
        }
    },
    methods: {
            refreshData(payload) {
                console.log({payload})
                this.firstname = payload.firstname
                this.lastname = payload.lastname
                console.log(this.imageProfil, payload.imageProfil)
                if ( payload.imageProfil ) {
                    console.log('passage ici')
                    this.imageProfil = payload.imageProfil 
                    localStorage.setItem("imageProfil", payload.imageProfil)
                }
                
            },
            editProfile() {
                this.modalEdit = !this.modalEdit
            },
            toggle() {
                this.toggleOn = !this.toggleOn
            },
            disconnectUser() {
                localStorage.clear()
                this.$router.push('/login')
            }
        },
    mounted() {

    }
}
</script>

<style scoped>
    header {
        display: flex;
        height: 10vh;
        background-color: #FFD7D7;
    }
    .left {
        width: 30%;
        height: 100%;
         display: flex;
    }
    .left a {
       
        text-decoration: none;
        color: black;
        width: 40%;
        height: 30%;
        margin: auto;
        font-size: 20px;
    }
    .left a:hover {
        color: white;
    }
    .middle{
        width: 40%;
        height: 100%;
    }
    .middle img {
        margin: 20px auto;
        height: 50%;
        object-fit: cover;
    }
    .right {
        display: flex;
        width: 30%;
        height: 100%;
        justify-content: center;
    }
    .full-name {
        margin: 10px auto 0 auto;
        color: #FD2D01;
    }
    .right .profile-img{
        border-radius: 25px;
        background-color: #4E5166;
        width: 50px;
        height: 50px;
        margin: auto 10px;
        cursor: pointer;
    }
    .photo-profil {
        height: 100%;
        width: 100%;
        border-radius: 25px;
    }
    .container-profile {
        display: flex;
        flex-flow: column wrap;
    }
   
    .edit-btn {
        padding: 5px 5px;
        margin: auto 0 5px 0;
        border-radius: 20px;
        border: solid 1px black;
        background-color: #4E5166;
        color: white;
        cursor: pointer;
    }
    .container-btn {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin: auto 5px;
    }
    .toggle-btn {
       font-size: 12px;
       margin: auto 0 5px 0;
       padding: 5px 10px;
       height: auto;
       width: auto;
       border-radius: 20px;
       color: white;
       background: #FD2D01;
       cursor: pointer;
       border: solid 1px black;
    }
    .toggle-btn-query {
        display: none;
    }
    .query {
        display: none;
    }
    @media (max-width: 750px) {
       
        .container-profile {
            justify-content: center;
        }
        .right .profile-img{
            display: none;
        }
        .left a {
            display: none;
        }
        .query {
            display: flex;
            border-radius: 50px;
            width: 50px;
            height: 50px;
            margin: auto;
            cursor: pointer;
        }
        .toggle-btn {
            display: none;
        }
        .toggle-btn-query {
            font-size: 12px;
            margin: auto 0 5px 0;
            padding: 5px 10px;
            display: flex;
            height: auto;
            width: auto;
            border-radius: 20px;
            color: white;
            background: #FD2D01;
            cursor: pointer;
            border: solid 1px black;
        }
    }
</style>