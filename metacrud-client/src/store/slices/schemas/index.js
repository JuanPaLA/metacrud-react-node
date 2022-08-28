import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchSchemas = createAsyncThunk(
    'schemas/fetchSchemas',
    async (dispatch) => {
        return fetch(`http://localhost:8088/metacrud/schemas`)
        .then((res) =>             
            res.json()        
        )
    }
 )

const schemasSlice = createSlice({
    name: "schemas",
    initialState: {
        schemas:{},
    },
    reducers: {
        setSchemas: (state, action) => {
            state.schemas[`${action.payload.entity}`] = action.payload.types;
        }
    },
    extraReducers: {
        [fetchSchemas.fulfilled]: (state, action) => {
            state.schemas = action.payload;
            state.status = true;
        },
        [fetchSchemas.rejected]: (state, action) => {
            state.status = false;
        },
        [fetchSchemas.pending]: (state, action) => {
            state.status = false;
        },
    }
});

export const { setSchemas } = schemasSlice.actions;

export default schemasSlice.reducer;

export const getSchemas = () => (dispatch, getState) =>{
    let schemas = getState().schemas.schemas;
    if(Object.keys(schemas).length === 0){
        dispatch(fetchSchemas());
    }
    schemas = getState().schemas.schemas;
    console.log(schemas['users']);
    return schemas; 
}

export const getSchemaByName = (name) => (dispatch, getState) =>{
    let schema = getState().schemas.schemas;
    console.log(schema);
    return schema;
}

export const createSchema = ( data, callback ) => (dispatch, getState) =>{
    var entity = Object.keys(data)[0];
    var types = data[Object.keys(data)[0]];
    console.log(entity, types);
    dispatch(setSchemas({entity, types}));
    Axios({
        url: `http://localhost:8088/metacrud/schemas`,
        method: 'post',
        data: data
    })
    .then((res)=>{      
        callback(res);
    })
    .catch((res)=>{
        console.log(res);
    })
}

export const deleteSchemas = ( schema, callback ) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8088/metacrud/schemas/${schema}`,
        method: 'delete',
    })
    .then((res)=>{      
        callback(res);
    }).catch((res)=>{
        console.log(res);
    }).finally(()=>{
        dispatch(fetchSchemas());
    }
    );
}
