import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";




class HousesService {

  async deleteHouse(id) {
    const res = await api.delete(`api/houses/${id}`)
    console.log('CAN YOU DELETE??');
    AppState.houses = AppState.houses.filter(h => h.id != id)
  }
  
  async getHousesFromApi(){
const res = await api.get('api/houses')
console.log('Huh???', res.data);

AppState.houses = res.data.map(h => new House(h))
console.log('THIS HOUSE?', AppState.houses);

 }


 async createHouse(formData){
 const res = await api.post('api/houses', formData)

 const newHouse = new House(res.data)
 AppState.houses.push(newHouse)
 AppState.emit('houses')
  
}



}

export const housesService = new HousesService()