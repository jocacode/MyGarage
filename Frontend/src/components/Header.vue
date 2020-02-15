<template>
    <div class="header-container">
        <label id="name">MY GARAGE</label>
        <div class="header-bar">
            <label class="list-item" v-for="item in itemList" :key="item.value" @click="emitMenuSelect(item.index)">
                <a style="text-decoration: none; color:white;">{{item.label}}</a>
            </label>
            <b-button style="margin-top:13px; margin-left: 40px;" type="is-info" @click="logout">Logout</b-button>
        </div>
    </div>
</template>

<script>
import router from '../routes/routes'
import {clearAccessToken} from '../services/contextManagement';
export default {
    data(){
        return{
             itemList: this.list
        }
    },
    props:  ['list'],
    methods: {
        logout: function(){
            clearAccessToken();
            router.push('login');
        },
          emitMenuSelect: function(event){
            this.$emit('changeView', event)
        },
    },
}
</script>

<style scoped>
    .header-container{
        display: flex;
        position: relative;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.89);
        width: 100%;
        height: 70px;
       
    }
    #name{
         font-size: 45px;
        padding: 15px;  
        font-family: 'big';
        color: white;
    }
    .header-bar{
        display: flex;
        flex-direction: row;
    }
    .list-item:not(:last-child){
         font-size: 23px;
        margin-right: 30px;
        border-bottom: none;
    }
@media screen and (max-width: 600px) {
    .header-container{
        margin-bottom: 10px;
    }
    #name{
        font-size: 30px;
    }
}
</style>

