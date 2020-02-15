<template>
    <div class="car" @click="BrandForPosts()">
        <a style="color:black;">
        <div class="car-header">
            <label style="font-size: 23px;">{{Car.Brand}}</label>
        </div>
        <img :src="getImageUrl()" style="height:190px; width: 190px;"/>
        </a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            Car: this.car
        }
    },
    props: ['car'],
    methods: {
        getImageUrl: function(){
            return require('../assets/Brands/' + this.Car.Brand + '.png');
        },
        BrandForPosts: function(){
             this.$emit('CarPost', this.Car.Brand)
        }
    },
}
</script>

<style scoped>
.car{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 230px;
    width: 200px;
    margin-top: 70px;
    margin-left: 70px;
    border: 1px solid rgb(206, 206, 206);
}
.car-header{
    display: flex;
    flex-direction: column;
    justify-content:  center;
}
</style>
