<template>
    <div class="main">
        <Header :list="this.menuItems" @changeView="setComponent($event)"></Header>
        <div class="home-container" v-if="this.showComponent == 'home'">
            <div class="post-container">
                <label style="font-size:40px; margin-top:15px;">MY GARAGE</label>
                <add-post :cars=UserCars  @submit="SaveNewPost($event)"></add-post>
                <post v-for="post in this.Posts" 
                        :key="post._id"
                        :post="post">
                </post>
            </div>
            <div class="garage-container sticky-normal" id="sticky-header">
                <label style="font-size:25px; margin-bottom: 15px;">PARKIRAJ SVOJ AUTOMOBIL OVDE</label>
                <park-the-car></park-the-car>
                <div class="parking">
                    <parked-car v-for="car in this.UserCars" :key="car._id" :carObject="car"></parked-car>
                </div>
            </div>
        </div>
        <div class="cars-page" v-if="this.showComponent == 'cars'">
            <cars></cars>
        </div>
    </div>
</template>

<script>
import AddPost from '../components/AddPost'
import Post from '../components/Post'
import Header from '../components/Header'
import ParkedCar from '../components/ParkedCar'
import Cars from '../components/Cars';
import ParkTheCar from '../components/ParkTheCar'
import { apiFetch, destinationUrl } from '../services/authFetch'
import {getUserInfo} from '../services/contextManagement'
import Pusher from 'pusher-js'
//import MessageBox from "../components/MessageBox"
//import Footer from '../components/Footer'

export default {
    components: { AddPost, Post, Header, ParkedCar, Cars, ParkTheCar },
    data(){
        return{
            UserCars: [],
            Message: '',
            newPost: {},
            showComponent: 'cars',
            menuItems: [
                {
                    key: 1,
                    label: 'Početna',
                    index: 'home'
                },
                {
                    key:2,
                    label: 'Automobili',
                    index: 'cars'
                },
                {
                    key:3,
                    label: 'Chat',
                    index: 'chat'
                }
            ],
            pusher: {},
            Posts: []
        }
    },
    methods: {
         LoadPosts: async function(){
            const user = getUserInfo();
            const response = await apiFetch('GET', destinationUrl + `/LoadManager/LoadPosts/${user.userId}`,null);
            if(response.ok){
                const posts = await response.json();
                this.Posts = posts;
            }else alert('DB Problem');
            console.log(this.Posts);
        },
        StickyElement: function() {
            if(this.showComponent == 'home'){
                var header = document.getElementById("sticky-header");
                if(window.pageYOffset > 110){
                    header.classList.remove("sticky-normal");
                    header.classList.add("sticky-scroll");
                }else{
                    header.classList.remove("sticky-scroll");
                    header.classList.add("sticky-normal");
                }
            }
        },
        SaveNewPost: function(post){
            this.NewPost = post;
        },
        setComponent: function(component){
            this.showComponent = component;
        },
        LoadMyCars: async function(){
             const user = getUserInfo();
             const response = await apiFetch('GET', destinationUrl + `/LoadManager/LoadUserCars/${user.userId}`,null);
             if(response.ok){
                const cars = await response.json();
                this.UserCars = cars;
             }else alert('DB Problem');
        },
        setPusher: function(){
             this.pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
                    host: process.env.VUE_APP_DESTINANTION_URL,
                    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
                    encrypted: false
                })
        },
        createPostChannels: function(){
            var postChannel = this.pusher.subscribe('add-post');
            postChannel.bind('new-post', (data) => {
                    this.Posts = [data, ...this.Posts];
            });
        },
        createCarChannel: function(){
            var carChannel = this.pusher.subscribe('add-car');
            carChannel.bind('new-car', (data) => {
                    console.log(data);
                    this.UserCars = [data, ...this.UserCars];
            });
        },
    },
    async created() {
        this.setPusher();
        this.createPostChannels();
        this.createCarChannel();
        this.LoadPosts();
        this.LoadMyCars();
        window.addEventListener('scroll', this.StickyElement);
    }
}
</script>

<style>
.main{
    display: block;
    flex-direction: column;
    position: relative;
    
    width:100%;
    height: 100%;
}
.home-container{
    position: absolute;
    width: 100%;
    background-size: cover;
    background-position: bottom;
    background-attachment: fixed;
    background-image: linear-gradient(
        rgb(95, 95, 95),
        rgba(255, 255, 255, 0)
    );
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.sticky-normal{
    margin-right:3%;
    margin-top:40px;
}
.sticky-scroll{
    position: fixed;
    top: 0;
    margin-right:3%;
}
.post-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 80%;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    margin:40px;
}
.garage-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32%;
    height: 800px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    right: 0;
}
#textstyle{
    font-size: 24px;
    text-align: justify;
    padding: 80px;
    padding-bottom: 0px;
}
.cars-page{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height:100%;
    width:100%;
}
.parking{
    overflow-y:scroll;
    width: 85%;
}
.parking::-webkit-scrollbar {
    display: none;
}
@media screen and (max-width: 600px) {
    .home-container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .message-garage{
        width: 95%;
    }
    .garage-container{
        position: relative;
        width: 100%;
        margin: 0px;
        padding: 0px;
        z-index: 0;
    }
    .post-container{
        width: 95%;
        padding: 0px;
        margin: 0px;
        margin-bottom: 20px;
    }
    #textstyle{
        font-size: 20px;
        padding: 10px;
    }
}
</style>
