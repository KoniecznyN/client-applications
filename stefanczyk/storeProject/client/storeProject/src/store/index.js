import { createStore } from 'vuex'
import promotions from './promotions'

const modules = {
    promotions,
    // kolejne moduły

}

const store = createStore({ modules })

export default store