<template>
    <div class="header-container">
        <label id="name">MY GARAGE</label>
        <b-button type="is-info">Logout</b-button>
    </div>
</template>

<script>
export default {
    
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
@media screen and (max-width: 600px) {
    .header-container{
        margin-bottom: 10px;
    }
    #name{
        font-size: 30px;
    }
}
</style>

