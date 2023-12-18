import Axios from "axios";

export const getMovies = async () => {
    return await Axios.get('http://localhost:3000/movies'); 
}

export const getTicketById = async (id) => {
    return await Axios.get(`http://localhost:3000/ticket/${id}`);
};

export const getTickets = async () => {
    return await Axios.get('http://localhost:3000/ticket'); 
}

export const createTicket = async (ticket) => {
    return await Axios.post('http://localhost:3000/ticket', ticket); 
}

export const loginUser = async (user) => {
    return await Axios.post('http://localhost:3000/users/login', user); 
}

export const createUser = async (user) => {
    return await Axios.post('http://localhost:3000/users', user); 
}
