import axios from "axios";
const baseUrl = "http://localhost:3005/books";

function getAll() {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(baseUrl, config);
}

function addBook(newBook){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(baseUrl,newBook,config)
}

function addReview(bookId,newreview){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(`${baseUrl}/${bookId}/reviews`,newreview,config)
}

function getAllReviews(bookId){
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}/${bookId}/reviews`,config)
}

export default { getAll,addBook,addReview,getAllReviews};