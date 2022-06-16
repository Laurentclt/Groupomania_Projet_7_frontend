<template>
    <HeaderBar />
    <ModalAuth :isSignup= "true" :message= "message" :help= "help"/>
</template>

<script>
import HeaderBar from '../components/auth/HeaderBar.vue'
import ModalAuth from '../components/auth/ModalAuth.vue'

export default {
      components: { HeaderBar, ModalAuth},
      data(){
        return {
            message:"inscription",
            help: "Vous-avez déja un compte ?"
        }
      }
}
</script>

<style>


</style>