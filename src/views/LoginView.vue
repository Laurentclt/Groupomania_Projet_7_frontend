<template>
  <HeaderBar />
  <ModalAuth :message= "message" /> 
</template>


<script>
import HeaderBar from '../components/auth/HeaderBar.vue'
import ModalAuth from '../components/auth/ModalAuth.vue'

export default {
      components: { HeaderBar, ModalAuth},
      data(){
        return {
          message: 'connexion',
        }
      }
}
</script>

<style>


</style>