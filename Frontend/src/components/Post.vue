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
                <b-button style="width: 70px; margin: 3px;" type="is-success" size="is-small" @click="LikePost()"> Like ({{this.Post.LikeCount}}) </b-button>
                <b-button style="width: 70px; margin: 3px;" type="is-danger" size="is-small"  @click="DislikePost()">Dislike ({{this.Post.DislikeCount}})</b-button>
                <a>  <img  :src="this.CommentPhoto" style="width:40px; height:40px" @click="ShowComments"/> </a>
            </div>
            
        </div>
        <div class="comment-section" id="comment" v-if="this.show_comment">
            <div class="add-comment">
                <b-input expend style="width: 80%" v-model="Comment" placeholder="Dodaj komentar"></b-input>
                <b-button style="width: 20%; font-size:15px;" @click="AddComment" type="is-info">Dodaj Komentar</b-button>
            </div>
            <div class="comment-slide">
                <comment v-for="comm in this.Comments" :key="comm._id" :comment="comm" :user="UserInfo.username"></comment>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from '../components/Comment'
import comment from '../assets/comment.png';
import Pusher from 'pusher-js'
import { getUserInfo } from '../services/contextManagement';
import { apiFetch, destinationUrl } from '../services/authFetch';

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
            show_comment: false,
            Comment: ''
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
            console.log(this.Post._id);
            const response = await apiFetch('GET', destinationUrl + `/Comment/GetComments/${this.Post._id}`,null);
            if(response.ok){
                const comments = await response.json();
                this.Comments = comments;
            }else alert('DB Problem');
        },
        ShowComments: function(){
            this.show_comment = !this.show_comment;
            const PostSection = document.getElementById('post');
            if(this.show_comment){
                PostSection.style.height = 50 + '%';
                this.LoadPostComments();
                console.log(this.Comments);
            }
        },
        AddComment: async function(){
            if(this.Comment == '' || this.Comment.length < 2){
                this.Notification('Morate pravilno uneti komentar!', 'is-warning');
                return
            }
            const CommentObj = {
                Content: this.Comment,
                PostId: this.Post._id,
                UserId: getUserInfo().userId
            }
            const response = await apiFetch('POST', destinationUrl + '/Comment/AddComment', CommentObj);
            if(response.ok){
                this.Notification('Uspešno ste dodali komentar!', 'is-success');
            }
            else alert('DB Problem!');
        },
         Notification:  function(message, type){
             this.$buefy.notification.open({
                duration: 2000,
                message: message,
                position: 'is-top-left',
                type: type,
            });
       },
       LikePost: async function(){
           const sendObject = {
               PostId: this.Post._id,
               UserId: getUserInfo().userId
           };
           const response = await apiFetch('PUT', destinationUrl + '/Post/LikePost', sendObject);
           const res = await response.json();
           if(!res.success)
               alert("DB Problem");
       },
        DislikePost: async function(){
           const sendObject = {
               PostId: this.Post._id,
               UserId: getUserInfo().UserId
           };
           const response = await apiFetch('PUT', destinationUrl + '/Post/DislikePost', sendObject);
            if(!response.ok)
                alert("DB Problem");
       },
        setPusher: function(){
             this.pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
                    host: process.env.VUE_APP_DESTINANTION_URL,
                    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
                    encrypted: false
                })
        },
        createCommentChannel: function(){
            var postChannel = this.pusher.subscribe('add-comment');
            postChannel.bind('new-comment', (data) => {
                    this.Comments = [data, ...this.Comments];
            });
        },
        createLikeDislikeChannel: function(){
            var channel = this.pusher.subscribe('like-dislike');
            channel.bind('new-like', (data) => {
                    this.post.LikeCount = data;
            });
            channel.bind('new-dislike', (data) => {
                    this.post.DislikeCount = data;
            });
        },

    },
    async created(){
        this.setPusher();
        this.createCommentChannel();
        this.createLikeDislikeChannel();
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
}
.comment-slide::-webkit-scrollbar {
    display: none;
}
.comment-slide{
    height: 100%;
    width:100%;
    overflow-y:scroll;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    padding: 18px;
}
.add-comment{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#text{
    font-family: 'big';
    font-size: 23px;
}
.likes{
    display: flex;
    flex-direction: row;
    justify-content: flex-start center;
    align-items: center;
    
}
#post-content{
    font-size:25px;
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

