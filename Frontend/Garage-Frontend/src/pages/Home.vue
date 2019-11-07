<template>
    <div class="main">
        <Header></Header>
        <div class="home-container">
            <div class="post-container">
                <label style="font-size:40px; margin-top:15px;">MY GARAGE</label>
                <label id="textstyle">
                    MY GARAGE vam pruža mogućnost dodavanja
                    postova na našu stranu u cilju razmenjivanja
                    iskustava vozača automobila vaseg modela.
                    Budite slobodni i postavite pitanje o svom 
                    ljubimcu.
                </label>
                <add-post></add-post>
                <post v-for="(item, index) in 3" :key="index"></post>
            </div>
            <div class="message-garage">
                <div class="garage-container">
                    <label style="font-size:30px;">MY GARAGE</label>
                </div>
                <MessageBox v-if="messaging"></MessageBox>
            </div>
        </div>
    </div>
</template>

<script>
import AddPost from '../components/AddPost'
import Post from '../components/Post'
import Header from '../components/Header'
import MessageBox from "../components/MessageBox"

export default {
    components: { AddPost, Post, Header, MessageBox },
    data(){
        return{
            messaging: true
        }
    }
}
</script>

<style>
.main{
    display: block;
    flex-direction: column;
    position: relative;
}
.home-container{
    position: absolute;
    width: 100%;
    background-size: cover;
    background-position: bottom;
     background-image: linear-gradient(
        rgb(138, 138, 138),
        rgba(0, 0, 0, 0.904)
    ),url('../assets/assets/charger.jpg');
    background-attachment: fixed;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.post-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    margin:40px;
}
.garage-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 30%;
    height: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    top: 0;
    right: 0;
    z-index: 2000;
    margin:40px;
    margin-top: 110px;
}
#textstyle{
    font-size: 24px;
    text-align: justify;
    padding: 80px;
    padding-bottom: 0px;
}
.message-garage{
    display: flex;
    height: 100%;
    width: 30%;
    flex-direction: column;
    justify-content: space-around;
}
@media screen and (max-width: 600px) {
    .home-container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .garage-container{
        position: relative;
        width: 85%;
        margin: 0px;
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
