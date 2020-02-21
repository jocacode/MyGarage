<template>
    <div class="main-comm">
        <div class="comm-info">
            <label>Odgovor od: {{this.user}}</label>
        </div>
        <div class="comm-content">
            <label id="text">{{this.comment.Content}}</label>
        </div>
        <div class="comm-button">
            <b-button style="width: 60px; height: 27px;
             margin: 5px;" type="is-success" size="is-small"> Like</b-button>
            <b-button style="width: 50px; height: 25px; 
             margin: 5px;" type="is-danger" size="is-small">Dislike</b-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Comment: this.comment,
        }
    },
    methods: {

    },
    props: {
        comment: {
            type: Object
        },
        user: {
            type: String
        }
    }
}
</script>

<style scoped>
.main-comm{
    display: flex;
    flex-direction: column;
    width:95%;
    height:40%;
    margin: 5px;
    background-color: rgb(236, 236, 236);
    border: 0.8px solid #4C3C1B;
    border-color: rgb(221, 221, 221);
}
.comm-info{
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
}
.comm-button{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
}
#text{
    font-family: 'big';
    font-size: 22px;
}
</style>
