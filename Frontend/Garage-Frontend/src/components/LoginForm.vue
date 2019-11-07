<template>
    <div class="login-container">
        <label>Prijavi se</label>
        <b-input  maxlength="30" v-model="nesto" 
        placeholder="Korisnicko ime"></b-input>
        <b-input  maxlength="30" v-model="this.username" 
        placeholder="Lozinka"></b-input>
        <b-button type="is-info" @click="login"
        style="font-family: 'big' font-size:30px;">LOG IN</b-button>
        <div class="form register">
            <label class="register">Još uvek nisi registrovan?</label>
            <div class="register">
                <label class="register"
                style="color:rgb(70, 146, 240);"
                @click="login"
                >Registruj se</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data(){
        return{
            username: '',
            password: ''
        }
    },
    methods: {
       login() {
           this.$buefy.notification.open('clicked')
       }
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'big';
    src: url('../assets/fonts/Big_Shoulders_Text/BigShouldersText-Regular.ttf');
}
.login-container{
    height: 300px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
label{
    color: white;
    font-size: 35px;
    font-family: 'big';
    font-weight: bold;
    font-style: normal;
}
input{
    background-color:white;
}
.register{
    font-size: 17px;
}
.form{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
@media  screen and (max-width: 600px){
    .login-container{
        height: 150px;
        width: 300px;
    }
    label{
        font-size: 25px;
    }
    .register{
        margin-top: 10px;
        font-size: 13px;
}
}

</style>

