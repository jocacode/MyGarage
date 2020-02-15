<template>
    <div class="login-container">
        <label>Prijavi se</label>
        <b-field type="is-info">
            <b-input  maxlength="30" type="username" v-model="user.Username" 
            placeholder="Korisnicko ime"></b-input>
        </b-field>
        <b-field type="is-info">
            <b-input  maxlength="30" type="password" v-model="user.Password" 
            placeholder="Lozinka"></b-input>
        </b-field>
        <b-button type="is-info" @click="Loign"
        style="font-family: 'big' font-size:30px;">LOG IN</b-button>
        <div class="form register">
            <label class="register">Još uvek nisi registrovan?</label>
            <div class="register">
                <label class="register">
                <router-link style="color:rgb(70, 146, 240);" :to="{name: 'Register'}">Registruj se</router-link>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import {destinationUrl} from '../services/authFetch';
import {setAccessToken, setUserInfo} from '../services/contextManagement';
import router from '../routes/routes'
export default {
    components: {},
    data(){
        return{
            user: {
                Username: '',
                Password: ''
            }
        }
    },
    methods: {
       Loign: async function() {
           if(!this.dataValidation()) return;
           const response = await fetch(destinationUrl + '/Auth/Login', {
               method: 'POST',
               body: JSON.stringify(this.user),
               headers: {
                   'Content-Type':'application/json'
               }
           })
           if(response.ok){
                const responseBody = await response.json();
                if(responseBody.Status == 'Wrong Password')
                    this.Notification(responseBody.Status, 'is-danger');
                else if(responseBody.Status == 'Wrong Username')
                    this.Notification(responseBody.Status, 'is-danger');
                else if(responseBody.Status)
                    this.Notification(responseBody.Status, 'is-warning');
                else {
                    this.Notification('Successfuly logged in', 'is-success');
                    setAccessToken(responseBody.authToken);
                    setUserInfo(responseBody.userExist);
                    router.push('home');
                }
           }
           else{
               alert('Conncetion error with DB');
           }
       },
       dataValidation(){
           if(this.user.Username == "" || this.user.Password == ""){
            this.Notification('Morate popuniti sva polja!', 'is-warning')
            return false
           }
           return true;
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

