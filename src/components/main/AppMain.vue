<template v-if="connected">
  <main class="app">
    <div class="add-comment">
      <button class="write-post" @click="toggleModal">{{ message }}</button>
    </div>

    <section class="all-posts">
      <PostContent v-for="post in posts" v-bind:key="post._id" :post="post" :checkAdmin="this.isAdmin" @refreshData="refreshPage" />
    </section>
  </main>
  <ModalPost v-if="showModalPost" @close=" this.showModalPost = false" @newPost="addPost"/>
</template>

<script>
import ModalPost from "./ModalPost.vue";
import PostContent from "./PostContent.vue";

export default {
  data() {
    return {
      connected: false,
      message: "Quoi de neuf à nous raconter ?",
      showModalPost: false,
      showModalEditPost: false,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      posts: [],
      isAdmin: false,
    };
  },
  components: {
    PostContent,
    ModalPost,
  },
  methods: {
    error()  {
      if(localStorage.getItem('token') === null) {
      this.$router.push('/login')
      } else {
      this.connected = true;
      return 0}
    },

    fillPage() {
    this.posts = []
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    };

    fetch(
      `http://localhost:3000/api/user/${this.userId}`,requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.isAdmin === true) {
            this.isAdmin = true
        }
      });

    fetch("http://localhost:3000/api/posts", requestOptions)
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts)
        for (let post of posts) {
        if (post.user.length === 0) {
          post.user = [];
          post.user.push({firstName : "utilisateur",
          lastName : "inconnu",
          imageProfil : null})
        }
        if (post.userId === this.userId || this.isAdmin === true) {
          post.isCreator = true;
        } else {
          post.isCreator = false;
        }
        
        let userWholiked = post.usersLiked;
            post.isLiked = false;
            for (let user of userWholiked) {
              if (user === this.userId) {
                  post.isLiked = true;
              }
            }
            this.posts.push(post);
            this.posts.sort(function (a, b) {
            return b.chrono - a.chrono;
            });
            console.log(post)
          }
      });
    },
    refreshPage(postId) {
      console.log(postId)
      let cleanPosts = this.posts.filter(post => post._id !== postId)
      console.log({cleanPosts})
      this.posts = cleanPosts
    },
    toggleModal() {
      this.showModalPost = true;
    },
    addPost(payload) {
      payload.comments = []
      if (payload.userId === this.userId || this.isAdmin === true) {
          payload.isCreator = true;
        } else {
          payload.isCreator = false;
        }
      this.posts.push(payload)
      this.posts.sort(function (a, b) {
        return b.chrono - a.chrono;
      });
    }
  },
  mounted() {
    if (this.error() === 0 ) {
    this.fillPage()
    }
  }
};
</script>

<style scoped>
.add-comment {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.write-post:hover {
  background-color: #4e5166;
  color: white;
}
.app {
  max-width: 1440px;
  display: flex;
  flex-flow: column;
  max-width: 900px;
  width: 80%;
  height: auto;
  margin: auto;
  padding-bottom: 5%;
  margin-top: 10vh;
  background-color: #ffd7d7;
  border-radius: 11px;
}
.write-post {
  height: auto;
  width: 40%;
  margin: 20px auto;
  border-radius: 11px;
  padding: 5px;
  cursor: pointer;
}
</style>
