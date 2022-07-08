<template>
  <div class="form" >
    <div class="containerInput" v-if="isSignup">
      <label for="">Nom:</label>
      <input type="text" class="modalForm" placeholder="Dupont" ref="lastname" />
    </div>
    <div class="containerInput" v-if="isSignup">
      <label for="">Prenom:</label>
      <input type="text" class="modalForm" placeholder="Jean" ref="firstname" />
    </div>
    <div class="containerInput">
      <label for="">Email:</label>
      <input type="email" class="modalForm" placeholder="Jean.Dupont@contact.fr" ref="email" />
    </div>
    <div class="containerInput">
      <label for="">Mot de passe:</label>
      <input type="password" class="modalForm" placeholder="8 caractères minimum (1 majuscule, 1 chiffre obligatoire)" ref="password" @keyup.enter="action"/>
    </div>
  </div>
  <router-link to="/login"><p>{{ help }}</p></router-link>
  <router-view/>
</template>

<script>
export default {
  props: {
    isSignup: {
      type: Boolean,
      default: false,
    },
    help: {
      type: String,
    },
    action: {
      type : Function,
    }
   
  },
  
};
</script>

<style>
.form {
  margin: 6% 0;
}
p {
  text-decoration: none;
}
.containerInput {
  width: 100%;
  display: flex;
  text-align: left;
}
.containerInput label {
  text-align: right;
  display: inline-block;
  width: 20%;
  padding-right: 30px;
  margin: 20px 0;
}
.containerInput input {
  width: 60%;
  margin: 20px 0;
  border-radius: 11px;
  padding-left: 20px;
}
</style>
