<template>
    <div class="modalWindow">
        <router-link to="/signup"><ModalButton name="inscription"></ModalButton></router-link>
        <router-view/>
        <router-link to="/login"><ModalButton name="connexion"></ModalButton></router-link>
        <router-view/>
        <ModalForm :isSignup="isSignup" :help="help"/>
        <SendButton :message="message" />
    </div>
</template>

<script>
import ModalButton from './ModalButton.vue'
import ModalForm from './ModalForm.vue'
import SendButton from './SendButton.vue'

export default {
    components: {ModalButton, ModalForm, SendButton},
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
        }
        
    }
}
</script>

<style>

.modalWindow {
    margin: auto;
    width: 45%;
    height: 50vh;
    background: #ffd7d7;
    border-radius: 11px;
 }
</style>