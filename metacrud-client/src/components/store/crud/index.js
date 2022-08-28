import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchItems = createAsyncThunk(
    `${type}/fetch`,
    async ({type, id}, getState) => {
        const response = await Axios.get(`../../../data/${type}`);
        return response;
    }
);



