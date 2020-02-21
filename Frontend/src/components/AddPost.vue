<template>
    <div class="addpost-container">
            <div class="add-post"> 
                <label style="font-size: 22px; margin-bottom: 15px;">Postavi pitanje o svom automobilu:</label>
                <div class="select">
                    <b-select
                        placeholder="Izaberi svoj automobil"
                        expanded
                        v-model="carId">
                        <option v-for="item in this.UserCars" :key="item._id" :value="item._id">
                             {{item.Brand}} {{item.Model}}
                        </option>
                    </b-select>
                </div>
                <div class="input-section">
                    <b-input maxlength="100" placeholder="Unesite tekst"
                        type="textarea" v-model="content">
                    </b-input>
                </div>
                <div class="add-post-button">
                    <b-button type="is-info" size="is-big" style="width:100%" 
                        @click="this.AddPost">OBJAVI
                    </b-button>
                </div>
            </div>
    </div>
</template>

<script>
import { apiFetch, destinationUrl } from '../services/authFetch';
import {getUserInfo} from '../services/contextManagement'
export default {
    data(){
        return{
            carId: '',
            content: '',
            UserCars: this.cars
        }
    },
    props:{
        cars: {
                type: Array
            }
    },
    methods: {
         AddPost: async function() {
            if(this.carId == '' || this.content == '' || this.content.length < 6){
                 this.Notification('Morate ispravno popuniti  polja!', 'is-warning');
                 return false;
            } 
            const PostObject = {
                Content: this.content,
                CarId: this.carId,
                UserId: getUserInfo().userId
            }
            const response = await apiFetch('POST', destinationUrl + '/Post/AddPost/', PostObject);
            if(response.ok){
                this.Notification('Uspešno ste dodali novi post!', 'is-success');
                this.$emit('submit', PostObject);
            }
            else {
                const error = await response.json();
                alert(error);
            }
        },
         Notification:  function(message, type){
             this.$buefy.notification.open({
                duration: 2000,
                message: message,
                position: 'is-top-left',
                type: type,
            });
       }
    },
}
</script>

<style>
.addpost-container{
    width: 85%;
    height: 275px;
    margin-top: 50px;
    border: 0.5px solid #4C3C1B;
    background-color: rgb(243, 243, 243);
    border-color: rgb(228, 226, 226);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.add-post{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:60%;
    height: 100%;
}
.add-post-button{
    display:flex;
    justify-content: flex-end;
    width:100%;
}
.field{
    display:flex;
    flex-direction: column;
}
label{
    font-family: 'big'
}
.input-section{
    width:100%;
    height:45%;
}
.select{
    display:flex;
    flex-direction: column;
    width:100%;
    height:20%;
    margin-bottom: 5px;
}
@media screen and (max-width: 600px) {
    .addpost-container{
        width: 95%;
    }
    .add-post{
        width:100%;
    }
}
</style>


