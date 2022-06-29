<template>
    <main class="app">
        <div class="add-comment">
            <button  class="write-post" @click="toggleModal">{{ message}}</button>
        </div>
        <!-- utiliser v-for pour récuperer tous les posts de l'api -->
        <section class="all-posts" >
        <PostContent v-for="post in posts" v-bind:key="post._id" :post="post" :userId="post.userId" />
       
        </section>
       
    </main>
    <ModalPost v-if="showModal" @close = "showModal = false" />
    
</template>

<script>
import ModalPost from "./ModalPost.vue"
import PostContent from './PostContent.vue'
export default {
    data() {
        return {
            message: "Quoi de neuf à nous raconter ?",
            showModal : false,
            token: localStorage.getItem("token"),
            posts: []
        }
    },
    components: {
        PostContent, ModalPost, 
    },
    methods: {
        toggleModal() {
            this.showModal = true
        }
       
    },
    mounted() {
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${this.token}` },
            };
            fetch("http://localhost:3000/api/posts", requestOptions)
                .then(response => response.json())
                .then((posts) => {
                    console.log(posts)
                    for (let post of posts) {
                        fetch(`http://localhost:3000/api/user/${post.userId}`, requestOptions)
                            .then(response => {
                                let dataUser;
                                if (response === null) {
                                     let uknownUser = {
                                        firstName: "Utilisateur",
                                        lastName: "inconnu"
                                    }
                                    dataUser = uknownUser.JSON.parse()
                                    console.log(dataUser)
                                } else {
                                    dataUser = response.json()
                                }
                                return dataUser;
                            })
                            .then((dataUser) => {
                                console.log(post, dataUser)
                                post.user = dataUser;
                                this.posts.push(post);
                            })
                    }
                
                })
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
        flex-flow: column ;
        max-width: 900px;
        width: 80%;
        height: auto;
        margin: auto ;
        padding-bottom: 5%;
        margin-top: 10vh;
        background-color: #FFD7D7;
        border-radius: 11px;
       
    }
    .write-post{
        height: auto;
        width: 50%;
        margin: 20px auto ; 
        border-radius: 11px;
        padding: 5px;
        cursor: pointer;
    }
    
</style>