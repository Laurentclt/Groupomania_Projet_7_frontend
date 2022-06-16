<template>
  <HeaderBar />
  <ModalAuth :message= "message" :help= "help"/> 
</template>


<script>
import HeaderBar from '../components/auth/HeaderBar.vue'
import ModalAuth from '../components/auth/ModalAuth.vue'

export default {
      components: { HeaderBar, ModalAuth},
      data(){
        return {
          message: 'connexion',
          help: "Vous-avez oublié votre mot de passe ?"
        }
      }
}
</script>

<style>


</style>