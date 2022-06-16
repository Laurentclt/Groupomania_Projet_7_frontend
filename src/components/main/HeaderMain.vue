<template>
    <header>
        <div class="left">
            <a href="/app">Accueil</a>
        </div>
        <div class="middle"> <img src="../../assets/icon-left-font-monochrome-black.png" alt=""></div>
        <div class="right">
            <div class="profile-img"></div>
            <div class="container-profile">
                <p>FirstName Lastname</p>
                <button class="edit-btn">éditer le profil</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    
}
</script>

<style>
    header {
        display: flex;
        height: 10vh;
        background-color: #FFD7D7;
    }
    .left {
        width: 20%;
        height: 100%;
         display: flex;
    }
    .left a {
       
        text-decoration: none;
        color: black;
        width: 40%;
        height: 30%;
        margin: auto;
        font-size: 20px;
    }
    .middle{
        width: 60%;
        height: 100%;
    }
    .middle img {
        margin: 20px auto;
        height: 50%;
        object-fit: cover;
    }
    .right {
        display: flex;
        width: 20%;
        height: 100%;
        justify-content: space-around;
    }
    .right .profile-img{
        border-radius: 20px;
        background-color: black;
        width: 50px;
        height: 50px;
        margin: auto 10px;
    }
    .container-profile {
        display: flex;
        flex-flow: column wrap;
    }
    .container-profile p {
        color: #FD2D01;
    }
    .edit-btn {
        padding: 5px 0;
        border-radius: 20px;
        background-color: #4E5166;
        color: white;
        cursor: pointer;
    }
</style>