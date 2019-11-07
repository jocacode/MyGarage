<template>
    <div class="addpost-container">
        <label style="font-size: 25px; padding:10px;">Dodaj Post</label>
        <b-input maxlength="100" 
            type="textarea"></b-input>
        <b-button type="is-success" size="is-small"
        style="align-item:right;">ADD POST</b-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text: ""
        }
    }
}
</script>

<style>
.addpost-container{
    width: 85%;
    height: 209px;
    margin-top: 50px;
    border: 0.5px solid #4C3C1B;
    border-color: rgb(228, 226, 226);
    border-radius: 2px;
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


