import { createStore, combineReducers} from 'redux'

let randomNumber =Math.random()*100000000000000000;
// console.log(randomNumber)
let account = {id: randomNumber , name: 'khurram', accountType: 'current', balance: 10000}

const accountsReducer = (state = [account,] , action) =>{
    
    switch (action.type) {
    case "ADDED":
      return [...state, action.payload]
    default:
      return state

  }
}
const detailAccount = (state = ["first", 'last'],action)=>{
    switch (action.type) {
    case "REMOVED":
      return [...state, action.payload]
    default:
      return state

  }
}

const allReducer = combineReducers({accountsReducer,detailAccount})

let store = createStore(allReducer);

export default store;