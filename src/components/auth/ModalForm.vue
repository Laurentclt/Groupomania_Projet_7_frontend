<template>
    <div class="form">
        <div class="containerInput" v-if="isSignup">
            <label for="">Nom:</label>
            <input type="text" class="modalForm" placeholder="  Dupont">
        </div>
        <div class="containerInput" v-if="isSignup">
            <label for="">Prenom:</label>
            <input type="text" class="modalForm" placeholder="  Jean">
        </div>
        <div class="containerInput ">
            <label for="">Email:</label>
            <input type="text" class="modalForm" placeholder="  Jean.Dupont@contact.fr">
        </div>
        <div class="containerInput ">
            <label for="">Mot de passe:</label>
            <input type="text" class="modalForm" placeholder="  8 caractères minimum (1 majuscule, 1 chiffre obligatoire)">
        </div>
    </div>
    <p>{{ help }}</p>
</template>

<script>
export default {
    props: {
        isSignup: {
            type: Boolean,
            default: false
        },
        help: {
            type: String
        }

}
}
</script>

<style>
.form {
    margin: 6% 0;
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

   }
</style>