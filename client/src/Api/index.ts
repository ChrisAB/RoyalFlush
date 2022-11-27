import axios from 'axios';
import { parkingAreaSchema } from '../App';

const API = axios.create({ baseURL: 'http://localhost:8888'});

export const fetchParkingAreas = () => API.get('/api/v1/parkingArea');

export const fetchParkingSpots = (id: string) => API.get(`/api/v1/parkingSpot/${id}`);

export const fetchAllParkingSpots = () => API.get("/api/v1/parkingSpot");