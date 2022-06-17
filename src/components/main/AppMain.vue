<template>
    <main class="app">
        <div class="add-comment">
        <button  class="write-post"  >{{ message}}</button>
        </div>
        <PostContent />
        <PostContent />
    </main>
    <ModalPost />
</template>

<script>
import ModalPost from "./ModalPost.vue"
import PostContent from './PostContent.vue'
export default {
    data() {
        return {
            message: "Quoi de neuf à nous raconter ?"
        }
    },
    components: {
        PostContent, ModalPost
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
    .write-post{
        height: 3vh;
        width: 50%;
        margin: 20px auto ; 
        border-radius: 11px;
        padding: 5px;
        cursor: pointer;
    }
    
</style>