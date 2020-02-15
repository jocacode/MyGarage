<template>
    <div class="addpost-container">
            <label style="font-size: 22px; padding:10px;">POSTAVI PITANJE O AUTOMOBILU</label>
            <b-field>
                <b-select
                    aria-placeholder="Izaberi svoj automobil"
                    expanded
                    v-model="carId">
                    <option v-for="item in this.UserCars" :key="item._id" :value="item._id">
                        {{item.Brand}} {{item.Model}}
                    </option>
                </b-select>
            </b-field>
            <b-input maxlength="100"
                type="textarea" v-model="content">
            </b-input>
            <div class="add-post-button">
                <b-button type="is-info" size="is-big"
                    @click="this.AddPost">OBJAVI
                </b-button>
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
    height: 265px;
    margin-top: 50px;
    border: 0.5px solid #4C3C1B;
    border-color: rgb(228, 226, 226);
    border-radius: 2px;
}
.add-post-button{
    display:flex;
    justify-content: flex-end;
}
label{
    font-family: 'big'
}
.input{
    width: 80%;
}
@media screen and (max-width: 600px) {
    .addpost-container{
        width: 95%;
    }
}
</style>


