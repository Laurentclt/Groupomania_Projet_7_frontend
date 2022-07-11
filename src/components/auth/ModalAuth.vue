<template>
    <div class="modalWindow">
        <router-link to="/signup"><ModalButton name="inscription"></ModalButton></router-link>
        <router-view/>
        <router-link to="/login"><ModalButton name="connexion"></ModalButton></router-link>
        <router-view/>
        <ModalForm :isSignup="isSignup" :help="help" ref="form" :action="getData"/>
        <SendButton :message="message" :action="getData"/>
    </div>
</template>

<script>

import ModalButton from './ModalButton.vue'
import ModalForm from './ModalForm.vue'
import SendButton from './SendButton.vue'

export default {
    components: {ModalButton, ModalForm, SendButton},
    data () {
        return {
            lastname: null,
            firstname: null,
            email: null,
            password: null,
        }
    },
    props: {    
        isSignup: {
            type: Boolean,
            default: false
        }, 
        help: {
            type: String
        },
        message: {
            type: String,
            default: 'error !'
        },
    },
    methods:{
        getData() {
        const regexString = /[a-zA-Z'-]{2,}/
        let lastnameChecked;
        let firstnameChecked;
        let emailChecked;
        let passwordChecked;



        let checkLastname = () => {
            this.lastname = this.$refs.form.$refs.lastname !== undefined ? this.$refs.form.$refs.lastname.value : ""
            const lastname = this.lastname
            
            if (lastname.match(regexString) === null) {
                alert('veuillez remplir le champ "nom" svp')
                return 0    
            } else {
                lastnameChecked = lastname.match(regexString).input
                return 1
            }
        }
        let checkFirstname = () => {
            this.firstname = this.$refs.form.$refs.firstname !== undefined ? this.$refs.form.$refs.firstname.value : ""
            const firstname = this.firstname
           
            if (firstname.match(regexString) === null) {
                alert('veuillez remplir le champ "prénom" svp')
                return 0
            } else {
                firstnameChecked = firstname.match(regexString).input
                return 1
            }
        }

        let checkEmail =() => {
        this.email = this.$refs.form.$refs.email.value
        const email = this.email
        // eslint-disable-next-line
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
       
        if (email.match(regexEmail) === null) {
            alert('Email invalide, veuillez vérifier votre email')
            return 0
        } else {
            emailChecked = email.match(emailChecked).input
            return 1
        }
        }
        let checkPassword = () => {
        this.password = this.$refs.form.$refs.password.value
        const password = this.password
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      
        if (password.match(regexPassword) === null) {
            alert('le mot de passe ne respecte pas les critères de sécurité (min 1 majuscule, min 1 chiffre et 8 caractères)')
            return 0
        } else {
            passwordChecked = password.match(regexPassword).input
            return 1
        }
        }
        const loginView = () => this.$router.push('/login')
        const appView = () => this.$router.push('/app')
        

        let requestGlobal = function() {
            console.log('requestGlobal', window.location.href, window.location.href.indexOf("signup"));
            if (window.location.href.indexOf("signup") > -1) {
                if(
                checkLastname() === 0|
                checkFirstname() === 0|
                checkEmail() === 0|
                checkPassword() === 0) {
                    console.log('erreur ici')
                    return 0
                }
                const bodySignup = { lastName: lastnameChecked, firstName: firstnameChecked, email: emailChecked, password: passwordChecked }
                return  {
                    body: bodySignup,
                    url: "signup",
                }
            }
            else {
                if (checkEmail()  === 0 |
                checkPassword() === 0) {
                    console.log('erreur ici')
                    return 0
                } else {
                const bodyLogin = {email: emailChecked, password: passwordChecked}
                return {
                    body: bodyLogin,
                    url: "login"
                }
                }
            }
        }

        const option = requestGlobal();

        if (option !== 0) {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(option.body)
        };
        
        let accessApp = function() {
            return appView()
        }
        let goToLogin = function () {
            return loginView()
        }
        
        
        fetch(`http://localhost:3000/api/user/auth/${option.url}`, requestOptions)
            .then(response => response.json())
            .then(data => { console.log({data})
                if(option.url === "signup") {
                    if (data.error) {
                        alert (data.error)
                    } else {
                    alert("Votre compte a bien été créé !")
                    goToLogin()
                    }
                }
                else {
                    if(data.error) {
                        alert(data.error)
                    }
                    else {
                         const getOptions = {
                            method: "GET",
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${data.token}`, },
                            };
                        localStorage.setItem("userId", data.userId)
                        localStorage.setItem("token", data.token)
                        fetch(`http://localhost:3000/api/user/${data.userId}`, getOptions)
                         .then(response => response.json())
                         .then(data => { 
                            localStorage.setItem("firstname", data.firstName)
                            localStorage.setItem("lastname", data.lastName)
                            localStorage.setItem("email", data.email)
                            localStorage.setItem("imageProfil", data.imageProfil)
                            accessApp()
                         })
                    
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });           
            
          
        }
        }
    }
}
</script>

<style>

.modalWindow {
    margin: auto;
    width: 45%;
    min-width: 320px;
    height: auto;
    background: #ffd7d7;
    border-radius: 11px;
 }
</style>