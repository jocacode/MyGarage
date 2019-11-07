<template>
    <div class="main-container">
        <div class="home">
            <register-form></register-form>
        </div>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
export default {
    components: {RegisterForm}
}
</script>

<style>
.home{
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: bottom;
     background-image: linear-gradient(
        rgba(8, 8, 8, 0.746),
        rgba(0, 0, 0, 0.842)
    ),url('../assets/assets/charger.jpg');
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
