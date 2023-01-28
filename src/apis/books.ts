import axios from "axios";

// kreiranje axios instance za pretragu knjiga 
export default axios.create({
    baseURL: 'http://openlibrary.org/search.json',
    params: {
        limit: 10
    }
})