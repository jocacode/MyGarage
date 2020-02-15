<template>
    <div class="main-container">
        <div class="home">
            <login-form></login-form>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
export default {
    components: { Footer, LoginForm }
}
</script>

<style scoped>
.main-container{
    display: flex;
    flex-direction: column;
}
.home{
    width: 100%;
    height: 850px;
    position: relative;
    background-size: cover;
    background-position: bottom;
     background-image: linear-gradient(
        rgba(8, 8, 8, 0.746),
        rgba(0, 0, 0, 0.904)
    ),url('../assets/assets/charger.jpg');
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>


