<template>
    <div class="post-container" id="post-size">
        <div class="profile-section" id="profile">
            <label id="text">{{UserInfo.brand}} {{UserInfo.model}} {{UserInfo.year}}</label>
            <label>@{{UserInfo.username}}</label>
        </div>
        <div class="post-section" id="post">
            <div class="post-content">
                <label id="post-content">{{Post.Content}}</label>
            </div>
            <div class="likes">
                <b-button style="width: 100px; margin: 3px;" type="is-success"> Like ({{Post.LikeCount}}) </b-button>
                <b-button style="width: 100px; margin: 3px;" type="is-danger">Dislike ({{Post.DislikeCount}})</b-button>
                <a>  <img  :src="this.CommentPhoto" style="width:50px; height:50px" @click="ShowComments"/> </a>
            </div>
            
        </div>
        <div class="comment-section" id="comment" v-if="this.show_comment">
            <div class="add-comment">
                <b-input expend placeholder="Dodaj komentar"></b-input>
            </div>
            <comment v-for="comm in this.Comments" :key="comm._id" :comment="comm" :user="UserInfo.username"></comment>
        </div>
    </div>
</template>

<script>
import { apiFetch, destinationUrl } from '../services/authFetch';
import Comment from '../components/Comment'
import comment from '../assets/comment.png';
export default {
    components: {Comment},
    data(){
        return{
            UserInfo: {
                username: '',
                brand: '',
                model: '',
                year: ''
            },
            Post: this.post,
            Comments: [],
            CommentPhoto: comment,
            show_comment: false
        }
    },
    props:{
        post:{
            type: Object
        }
    },
    methods: {
        LoadCarInfo: async function(){
            const response = await apiFetch('GET', destinationUrl + `/Car/GetCar/${this.Post.CarId}`,null);
            if(response.ok){
                const car = await response.json();
                this.UserInfo.brand = car.Brand;
                this.UserInfo.model = car.Model;
                this.UserInfo.year = car.Year;
            }else alert('DB Problem');
        },
        LoadUserInfo: async function(){
            const response = await apiFetch('GET', destinationUrl + `/User/GetUser/${this.Post.UserId}`,null);
            if(response.ok){
                const user = await response.json();
                this.UserInfo.username = user.Username;
            }else alert('DB Problem');
        },
        LoadPostComments: async function() {
            const response = await apiFetch('GET',destinationUrl + `/Comment/GetComments/${this.Post._id}`,null);
            if(response.ok){
                const comments = await response.json();
                if(comments.length > 1)
                    this.Comments = comments;
            }else alert('DB Problem');
        },
        ShowComments: function(){
            this.show_comment = !this.show_comment;
            const PostSection = document.getElementById('post');
           // const PostSize = document.getElementById('post-size');
            if(this.show_comment){
                PostSection.style.height = 50 + '%';
                this.LoadPostComments();
            }else{
                PostSection.style.height = 90 + '%';
            }
        }

    },
    async created(){
        this.LoadCarInfo();
        this.LoadUserInfo();
    }
}
</script>

<style scoped>
.post-container{
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 500px;
    border-radius: 3px;
    border: 0.8px solid #4C3C1B;
    border-color: rgb(219, 219, 219);
    margin: 20px;
}
.post-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width:100%;
}
.comment-section{
    display: block;
    align-items: center;
    width: 100%;
    height: 60%;
    background-color: rgb(255, 255, 255);
    overflow-y:scroll;
}
.comment-section::-webkit-scrollbar {
    display: none;
}
.profile-section{
     display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: rgb(243, 243, 243);
}
.post-section{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;
}
.add-comment{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#text{
    font-family: 'big';
    font-size: 25px;
}
.likes{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: right;
    
}
#post-content{
    font-size:28px;
}
@media screen and (max-width: 600px) {
    .postic{
        width: 95%;
        height: 410px;
    }
    .post-container{
        width: 100%;
    }
    #post-content{
        font-size:20px;
    }
}
</style>

