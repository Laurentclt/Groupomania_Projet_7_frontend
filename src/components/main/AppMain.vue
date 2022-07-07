<template v-if="connected">
  <main class="app">
    <div class="add-comment">
      <button class="write-post" @click="toggleModal">{{ message }}</button>
    </div>

    <section class="all-posts">
      <PostContent v-for="post in posts" v-bind:key="post._id" :post="post" @postDeleted="refreshDeletedPost"/>
    </section>
  </main>
  <ModalPost v-if="showModalPost" @close="refreshPage" />
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
    refreshDeletedPost() {
      this.fillPage()
    },
    fillPage() {
    if (localStorage.getItem("token")) {
      this.connected = true;
    }
    this.posts = []
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    };

    fetch(
      `http://localhost:3000/api/user/${this.userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isAdmin === true) {
            this.isAdmin = true
        }
      });

    fetch("http://localhost:3000/api/posts", requestOptions)
      .then((response) => response.json())
      .then((posts) => {
        for (let post of posts) {
          fetch(`http://localhost:3000/api/user/${post.userId}`, requestOptions)
            .then((response) => response.json())
            .then((dataUser) => {
              if (dataUser === null) {
                dataUser = {
                  firstName: "Utilisateur",
                  lastName: "inconnu",
                };
              }
              return dataUser;
            })
            .then((dataUser) => {
              if (post.userId === this.userId || this.isAdmin ===  true) {
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
              post["user"] = dataUser;

              this.posts.push(post);
              this.posts.sort(function (a, b) {
                return b.chrono - a.chrono;
              });
            });
        }
        console.log(posts)
      });
  },
    refreshPage() {
      this.showModalPost = false
      this.fillPage();
    },
    toggleModal() {
      this.showModalPost = true;
    
    },
  },
  mounted() {
    this.fillPage()
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
