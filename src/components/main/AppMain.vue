<template>
    <main class="app">
        <div class="add-comment">
        <textarea rows="1" cols="5">Quoi de neuf à nous raconter ?</textarea>
        <button>publier</button>
        </div>
        <PostContent />
        <PostContent />
    </main>
    
</template>

<script>
import PostContent from './PostContent.vue'
export default {
    components: {
        PostContent
    }
}
</script>

<style scoped>
    .add-comment {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    }   
    .app {
        display: flex;
        flex-flow: column wrap;
        max-width: 900px;
        width: 80%;
        height: 80vh;
        margin: auto ;
        margin-top: 10vh;
        background-color: #FFD7D7;
        border-radius: 11px;
       
    }
    textarea{
        height: 3vh;
        width: 50%;
        margin: 20px 20px 20px 20% ; 
        border-radius: 11px;
    }
    button {
       height: 3vh;
       border-radius: 11px;
       margin-right: 50px;
       margin: 20px;
       cursor: pointer;
       background-color: #4E5166;
       color: white;
    }
</style>