<template>
    <div class="postic">
        <div class="profile-section">
            <label style="position: left;">@{{user.username}}</label>
            <label id="text">{{user.username}} ima pitanje o svom automobilu {{user.car}}</label>
        </div>
        <div class="post-section">
            <label style="font-size: 20px;">{{this.textpost}}</label>
            <div class="likes">
                <h1>Like</h1>
                <h2>Like</h2>
            </div>
        </div>
        <div class="comment-section">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user: {
                username: 'Jovan',
                car: 'Audi A3 2.0 TDI 2005',
            },
            posts: [],
            textpost: 'Koliko je skupo odrzavanje ovog automobila',
        }
    }
}
</script>

<style scoped>
.postic{
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 510px;
    border-radius: 4px;
    border: 0.5px solid #4C3C1B;
    border-color: rgb(228, 226, 226);
    margin: 20px;
}
.comment-section{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 20%;
    background-color: rgb(243, 243, 243);
}
.profile-section{
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background-color: rgb(243, 243, 243);
}
.post-section{
     display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;
}
#text{
    font-family: 'big';
    font-size: 25px;
}
.likes{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: right;
}
@media screen and (max-width: 600px) {
    .postic{
        width: 95%;
        height: 410px;
    }
}
</style>

