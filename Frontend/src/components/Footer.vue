<template>
    <div class="footer-container">
        <div class="text-container"> 
            <label id="name">MY GARAGE</label>
            <label id="text">
                © 2019 My Garage All Rights Reserved
            </label>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.footer-container{
    background-color: rgba(22, 21, 21, 0.911);
    border-radius: 0px;
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;
    height: 100px;
}
#name{
    font-size: 40px;
    padding: 15px;  
    font-family: 'big';
    color: white;

}
.text-container{
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    text-align: right;
}
#text{
     font-family: 'big';
     font-size: 20px;
     color: white;
}
@media  screen and (max-width: 600px){
    #name{
       font-size: 20px;
    }
    #text{
        font-size: 12px;
    }

}

</style>
