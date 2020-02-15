<template>
    <div class="login-container">
        <div class="login">
            <label>Registruj se</label>
            <b-field type="is-info">
                <b-input  maxlength="30" type="email" v-model="User.Email" 
                placeholder="Email"></b-input>
            </b-field>
            <b-field type="is-info">
                <b-input  maxlength="30" v-model="User.Username" 
                placeholder="Korisnicko ime"></b-input>
            </b-field>
            <b-field type="is-info">
                <b-input  maxlength="30" type="password" v-model="User.Password" 
                placeholder="Lozinka"></b-input>
            </b-field>
            <b-button type="is-info" @click="Register"
            style="font-family: 'big' font-size:50px;">REGISTRUJ SE</b-button>
            <div class="go-to-login" >
                <label class="font">Već imaš nalog?</label>
                <div class="register" >
                    <label class="font">
                    <router-link style="color:rgb(70, 146, 240);" :to="{name: 'Login'}">Uloguj se</router-link>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../routes/routes'
import {destinationUrl} from '../services/authFetch';
import {setAccessToken, setUserInfo} from '../services/contextManagement';
import {apiFetch} from '../services/authFetch';
export default {

    data(){
        return{
            User:{
                Username: "",
                Email: "",
                Password: ""
            }
        }
    },
    methods: {
         async Register(){
            const response = await apiFetch('POST', destinationUrl + '/Auth/Register', this.User);
            if(response.ok){
                const responseBody = await response.json();
                console.log(responseBody);
                if(responseBody.Success){
                    this.Notification('Successfuly registration', 'is-success');
                    setAccessToken(responseBody.AuthToken);
                    setUserInfo(responseBody.savedUser);
                    router.push('home');
                   
                }else  this.Notification(responseBody.Status, 'is-warning');
            }else alert('Connection error with DB');
        },
         Notification:  function(message, type){
             this.$buefy.notification.open({
                duration: 2000,
                message: message,
                position: 'is-top-left',
                type: type,
            });
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
    height: 40%;
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
label{
    color: white;
    font-size: 35px;
    font-family: 'big';
    font-weight: bold;
    font-style: normal;
    margin-bottom:10px;
}
.login{
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.purpose{
    width: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
}
.go-to-login{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
}
.font{
    font-size:19px;
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
