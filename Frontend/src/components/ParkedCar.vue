<template>
    <div class="main-parked-car">
        <div class="car-brand">
            <label>{{Car.Brand}}</label>
            <label>{{Car.Model}}</label>
        </div>
        <div class="car-info">
            <div class="info">
                <label>Godište: {{Car.Year}}</label>
                <label>Kilometraža: {{Car.Kilometars}}km</label>
                <label>Motor: {{Car.Engine}}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // Car: {
            //     Brand: "Audi",
            //     Model: "A3",
            //     Year: "2005",
            //     Kilometars: 122300,
            //     Engine: "2.0 TDI 140KS"
            // },
            Car: this.carObject

        }
    },
    methods: {

    },
    props: ['carObject']
}
</script>

<style scoped>
.main-parked-car{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 225px;
    margin-bottom: 20px;
    margin-top: 10px;
   
}
.car-brand{
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    background-color: rgb(224, 224, 224);
    width: 100%;
    height: 15%;

}
.car-info{
     display: flex;
    flex-direction: row;
    height:100%;
    width:100%;
     border: 0.2px solid rgb(236, 236, 236);
}
.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 100%;
}
label{
    text-align: center;
    font-size: 25px;
    
}
@media screen and (max-width: 600px) {
    label{
        font-size:18px;
    }
    .main-parked-car{
        height: 190px;
    }
}

</style>
