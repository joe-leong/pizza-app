<template>
    <div class="row">
        <div id="home" class="col-sm-12 text-center">
            <div class="background">
                <h1>欢迎大家的到来</h1>
                <h2>这里有很好吃的东西</h2>
                <button class="btn btn-success" @click="goToMenu">Let's Go!</button>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    methods:{
        goToMenu(){
            this.$router.push({name:'menuLink'})
        }
    }
}
</script>
<style>
#home{
    background: url('../../src/assets/bg.jpg');
    height: 85vh;
    padding: 10%;
}
h1,h2{
    margin: 6%;
}
.background{
    background: #eee;
    opacity: .5;
    max-width: 70vw;;
    margin: 0 auto;
    padding: 20px 0;
}
</style>

