<template>
    <header>
        <img src="../../assets/icon-left-font-new.png" alt="">
    </header>
</template>

<script>
export default { 
    name: 'HeaderBar' 
}
</script>
    
<style scoped>

header {
    display:block;
    height: 15vh;
    color: white;
    margin-bottom: 30px;
}
header img {
    margin: auto;
    
    width: 100%;
    max-width: 375px;
}
@media  (max-width: 600px) {
    header img  {
        height: 100%;
    }
    
}

</style>