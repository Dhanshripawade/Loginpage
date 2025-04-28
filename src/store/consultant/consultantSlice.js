
import { createSlice } from "@reduxjs/toolkit";
import { registerDoctor ,LoginDoctor} from "./consultantThunk";


const initialState = {
    user:null,
    loading: false,
    error: null,
    token:null,
}
 
 const consultantSlice=createSlice({
    name:'consultant',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
          },
      },
        extraReducers:(builder)=>{
            builder.addCase(registerDoctor.pending,(state)=>{
                state.status="loading"
            })
            .addCase(registerDoctor.fulfilled,(state,action)=>{
                state.status ="succeeded",
                state.data=action.payload;
            })
            .addCase(registerDoctor.rejected,(state,action)=>{
                state.status="failed",
                state.error=action.error.message;
            })

            .addCase(LoginDoctor.pending,(state)=>{
                    state.status="loading"
            })
            .addCase(LoginDoctor.fulfilled,(state,action)=>{
                state.status ="successded",
                state.data=action.payload;
            })
            .addCase(LoginDoctor.rejected, (state, action) => {  
                state.status = 'failed';
                state.error = action.error.message;
              })
        }
    })
    export const {setFilter}=consultantSlice.actions;
    export default consultantSlice.reducer;
