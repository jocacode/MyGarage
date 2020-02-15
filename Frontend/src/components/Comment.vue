<template>
    <div class="main-comm">
        <div class="comm-info">
            <label>Odgovor od: {{this.user}}</label>
        </div>
        <div class="comm-content">
            <label id="text">{{this.comment.Content}}</label>
        </div>
        <div class="comm-button">
            <b-button style="width: 70px; height: 30px; 
                margin-bottom: 10px; margin-right: 10px;" type="is-success" size="small"> Like</b-button>
            <b-button style="width: 70px; height: 30px; 
            margin-bottom: 10px;" type="is-danger">Dislike</b-button>
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
    width:100%;
    height:40%;
    margin-top:10px;
    background-color: rgb(206, 206, 206);
    border: 0.8px solid #4C3C1B;
    border-color: rgb(173, 173, 173);
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
}
#text{
    font-family: 'big';
    font-size: 22px;
}
</style>
