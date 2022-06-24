<template>
    <div class="modalWindow">
        <router-link to="/signup"><ModalButton name="inscription"></ModalButton></router-link>
        <router-view/>
        <router-link to="/login"><ModalButton name="connexion"></ModalButton></router-link>
        <router-view/>
        <ModalForm :isSignup="isSignup" :help="help" ref="form" />
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

        this.email = this.$refs.form.$refs.email.value
        const email = this.email
        this.lastname = this.$refs.form.$refs.lastname !== undefined ? this.$refs.form.$refs.lastname.value : ""
        const lastname = this.lastname
        this.firstname = this.$refs.form.$refs.firstname !== undefined ? this.$refs.form.$refs.firstname.value : ""
        const firstname = this.firstname
        this.password = this.$refs.form.$refs.password.value
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        const passwordChecked = this.password.match(re).input

        const appView = this.$router.push('/app')
        

        let requestGlobal = function() {
            if (window.location.href.indexOf("signup") > -1) {
                
                const bodySignup = { lastName: lastname, firstName: firstname, email: email, password: passwordChecked }
                return  {
                    body: bodySignup,
                    url: "signup",
                }
            }
            else {
                const bodyLogin = {email: email, password: passwordChecked}
                return {
                    body: bodyLogin,
                    url: "login"
                }
            }
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestGlobal().body)
        };
        
        let accessApp = function() {
            return appView
        }
        
        fetch(`http://localhost:3000/api/user/auth/${requestGlobal().url}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(requestGlobal().url === "signup") {
                    alert("Votre compte a bien été créé !")
                }
                else {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userId", data.userId)
                    localStorage.setItem("firstname", data.firstName)
                    localStorage.setItem("lastname", data.lastName)
                    localStorage.setItem("email", data.email)
                    accessApp()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });           
            
          
        },   
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