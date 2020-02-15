<template>
    <div>
        <div class="car-main" v-if="this.ShowCars">
            <car v-for="car in Cars" :key="car.Brand"  :car="car" @CarPost="setCar($event)"></car>
        </div>
        <div class="car-main" v-if="!this.ShowCars">
            <post v-for="post in this.PostForSpecificCar" :key="post.index" :post="post"></post>
            <div class="reset-car-page">
                <b-button type="is-info" style="width: 100px;" @click="GoToCarsPage">Vrati se</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import Car from '../components/Car'
import Post from '../components/Post'
import {cars} from '../services/carsdata'
import { destinationUrl, apiFetch } from '../services/authFetch';
export default {
    components: {Car, Post},
    data() {
        return {
            Cars: cars,
            ShowCars: true,
            PostForSpecificCar: [],
        }
    },
    methods: {
        setCar: function(event){
            this.ShowCars = !this.ShowCars;
            this.LoadBrandPost(event)
        },
        GoToCarsPage: function(){
            this.ShowCars = !this.ShowCars;
            this.PostForSpecificCar = [];
        },
        LoadBrandPost: async function(brand){
            console.log(brand);
            const response = await apiFetch('GET', destinationUrl + `/LoadManager/LoadCarPosts/${brand}`,null);
            if(response.ok){
                const posts = await response.json();
                this.PostForSpecificCar = posts;
            }else alert('DB Problem');
        },
    }
}
</script>

<style scoped>
.car-main{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    width: 1100px;
}
.car-info{
    display: flex;
    justify-content: center;
    align-items: center;
}
.reset-car-page{
    display:flex;
    flex-direction: right;
    height: 100%;
    width:85%;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
