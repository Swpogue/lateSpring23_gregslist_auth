import { AppState } from "../AppState.js"
import { House } from "../models/House.js";
import { getFormData } from "../utils/FormHandler.js"
import { setHTML } from "../utils/Writer.js"
import { housesService } from "../services/HousesService.js"
import { Pop } from "../utils/Pop.js";

function _drawHouses() {
  console.log('House draws!');
  let template = ''

  AppState.houses.forEach(h => {
    template += h.HouseCard
  })

  setHTML('app', template)
}


function _drawButton() {
  if (AppState.account) {
    setHTML('the-place-to-put-the-button', '<button class="btn btn-dark square" data-bs-toggle="modal" data-bs-target="#the-target-id" >OPEN THE MODAL</button>')
  }
}



export class HousesController {
  constructor() {
    console.log('HOUSE CONTROLLER HERE!');
    setHTML('modal-guts', House.HouseForm())
    _drawHouses()

    this.getHousesFromApi()
    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)

    AppState.on('account', _drawButton)


  }

  async getHousesFromApi() {
    try {
      await housesService.getHousesFromApi()
    } catch (error) {
      Pop.error(error)
    }
  }



  async createHouse() {
    try {
      // we are submitting a form.... 
      window.event.preventDefault()
      // 🛩️ target acquired
      const form = window.event.target
      // how do we extract the data from the form?
      const formData = getFormData(form)
      console.log('what is in the formData', formData)
      await housesService.createHouse(formData)
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#the-target-id').hide()

    } catch (error) {
      Pop.error(error)
    }
  }

async deleteHouse(id) {
    try {

      const yes = await Pop.confirm('Delete the house?')

      if (!yes) {
        return
      }

      await housesService.deleteHouse(id)

    } catch (error) {
      Pop.error(error)
    }
  }




}