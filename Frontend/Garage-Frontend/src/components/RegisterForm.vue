<template>
    <div class="login-container">
        <div class="login">
            <label>Registruj se</label>
            <b-input  maxlength="30" v-model="username" 
            placeholder="Korisnicko ime"></b-input>
            <b-input  maxlength="30" v-model="password" 
            placeholder="Lozinka"></b-input>
            <b-input  maxlength="30" v-model="mail" 
            placeholder="Email"></b-input>
            <b-button type="is-info" @click="login"
            style="font-family: 'big' font-size:30px;">REGISTRUJ SE</b-button>
        </div>
        <div class="purpose">
            <label >MY GARAGE</label>
            <label >Lorem ipsum dolor sit amet consectetur
                 adipisicing elit. Excepturi voluptas eius 
                 perferendis obcaecati unde maxime, sequi eum 
                 nemo sit iure ipsum ipsum maxime squi.
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt.</label>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username: '',
            mail: '',
            password: '',
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
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
label{
    color: white;
    font-size: 40px;
    font-family: 'big';
    font-weight: bold;
    font-style: normal;
}
.login{
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.purpose{
    width: 60%;
    padding-left: 100px;
    text-align: justify;
    display: flex;
    flex-direction: column;
}
@media  screen and (max-width: 600px){
    .login-container{
        flex-direction: column;
        width: 100%;
        height: 500px;
        justify-content: space-between;
        align-items: center;

    }
    .login{
        width: 80%;
    }
    .purpose{
        padding: 0px;
        width: 80%;
        font-size: 20px;
    }
    label{
        font-size: 20px;
    }
}
</style>
