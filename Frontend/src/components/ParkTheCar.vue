<template>
    <div class="park-the-car">
        <div class ="brands">
            <b-field style="color:blue;" label="Izaberi Marku:">
                <b-select placeholder="Sve Marke" v-model="CarToPark.SelectedBrand" @input="setCarModels">
                    <option 
                        v-for="option in this.Cars"
                        :value="option"
                        :key="option.Brand">
                        {{ option.Brand }}
                    </option>
                </b-select>
            </b-field>
            <b-field style="color:blue" label="Izaberi Model:">
                <b-select placeholder="Svi Modeli" v-model="CarToPark.SelectedModel">
                    <option 
                        v-for="option in this.ModelList"
                        :value="option"
                        :key="option.index">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Unesi Kilometre">
                <b-input placeholder="Kilometri" v-model="CarToPark.InputKilometars"
                    type="number" min="0" max="1000000"></b-input>
            </b-field>
        </div>
        <div class="info brands">
            <b-field style="color:blue" label="Izaberi Gorivo:">
                <b-select placeholder="Gorivo" v-model="CarToPark.SelectedEngine">
                    <option 
                        v-for="option in Engines"
                        :value="option.Title"
                        :key="option.Title">
                        {{ option.Title }}
                    </option>
                </b-select>
            </b-field>
            <b-field style="color:blue" label="Izaberi Godište:">
                <b-select placeholder="Godina" v-model="CarToPark.SelectedYear">
                    <option 
                        v-for="option in this.Years"
                        :value="option.Title"
                        :key="option.Title">
                        {{ option.Title }}
                    </option>
                </b-select>
            </b-field>
        </div>
        <div class="brands">
            <b-button type="is-info" style="width: 100%"
                @click="ParkCar">Parkiraj automobil</b-button>
        </div>
    </div>
</template>

<script>
import {cars, engines, years} from '../services/carsdata'
import { apiFetch, destinationUrl } from '../services/authFetch';
import { getUserInfo } from '../services/contextManagement';
export default {
    data() {
        return {
            Cars: cars,
            Engines: engines,
            Years: years,
            CarToPark: { 
                SelectedBrand: null, 
                SelectedModel: null,
                SelectedYear: null,
                SelectedEngine: null,
                InputKilometars: null
            },
            ModelList: [],
        }
    },
    methods: {
        ParkCar: async  function(){
            if(!this.validateSelectedOption()) return;
            const CarObject = {
                Brand: this.CarToPark.SelectedBrand.Brand,
                Model: this.CarToPark.SelectedModel,
                UserId: getUserInfo().userId,
                Year: this.CarToPark.SelectedYear,
                Engine: this.CarToPark.SelectedEngine,
                Kilometars: this.CarToPark.InputKilometars
            }
            const response = await apiFetch('POST', destinationUrl + '/Car/ParkTheCar/', CarObject);
            if(response.ok){
                 this.Notification('Uspešno ste parkirali svoj automobil u garažu!','is-success');
            }else alert("DB Problem" + response.message);
        },
        setCarModels: function(){
            if(this.CarToPark.SelectedBrand != null){
                this.ModelList = this.CarToPark.SelectedBrand.Models;
            }
        },
        validateSelectedOption: function(){
            if(this.CarToPark.SelectedBrand == null || this.CarToPark.SelectedModel == null ||
                this.CarToPark.SelectedYear == null || this.CarToPark.SelectedEngine == null || 
                this.CarToPark.InputKilometars == null){
                this.Notification('Morate uneti sve podatke o automobilu!','is-warning');
                return false;
            }
            else return true;
        },
          Notification:  function(message, type){
             this.$buefy.notification.open({
                duration: 2000,
                message: message,
                position: 'is-top-left',
                type: type,
            });
      }
    }
}
</script>

<style scoped>
.park-the-car{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 185px;
    width: 85%;
    background-color: rgb(250, 250, 250);
}
.brands{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
</style>
