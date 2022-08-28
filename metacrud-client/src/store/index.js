import { configureStore } from "@reduxjs/toolkit";
import schemas from "./slices/schemas";
import entities from "./slices/entities";

export default configureStore({
    reducer: {
        schemas,
        entities
    },
});


