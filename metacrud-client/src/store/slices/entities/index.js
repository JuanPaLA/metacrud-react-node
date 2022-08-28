import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchEntities = createAsyncThunk(
    'entities/fetchEntities',
    async ( type) => {
        return fetch(`http://localhost:8088/metacrud/${type}`).then((res) => 
            res.json()        
        )
    }
 )

const entitiesSlice = createSlice({
    name: "entities",
    initialState: {
        entities: {},
    },
    reducers: {
        setEntities: (state, action) => {
            state.entities[`${action.payload.entity}`] = action.payload.list;
        }
    },
    extraReducers: {
        [fetchEntities.fulfilled]: (state, action) => {
            state.entities[`${action.payload.entity}_list`] = action.payload.entities;
        },
        [fetchEntities.rejected]: (state, action) => {
            state.status = false;
        },
        [fetchEntities.pending]: (state, action) => {
            state.status = false;
        }
    }   
});

export const { setEntities } = entitiesSlice.actions;

export default entitiesSlice.reducer;

export const post = (type, data, callback) => (dispatch) =>{
    console.log(data, type);
    Axios({
        method: 'post',
        url: `http://localhost:8088/metacrud/${type}`,
        data: data
    })
    .then((res) => {
        callback(res);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        dispatch(fetchEntities(type));
    }
    );
}

export const put = (type, data, callback) => (dispatch) =>{
    Axios({
        method: 'put',
        url: `http://localhost:8088/metacrud/${type}/${data.id}`,
        data: data
    })
    .then((res) => {
        dispatch(fetchEntities(type));        
        callback(res);
    }).catch((err) => {
        callback(err);
    })
}

export const deletes = (type, id, callback) => (dispatch) =>{
    console.log(id, type);
    Axios({
        method: 'delete',
        url: `http://localhost:8088/metacrud/${type}/${id}`
    })
    .then((res) => {
        callback(res);
    }).catch((err) => {
        callback(err);
    }).finally(() => {
        dispatch(fetchEntities(type));
    }
    );
}