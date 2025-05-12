import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, getConsltantData , updateDoctor , 
  registerReception,getallreception,deleteReception,
  viewReception ,updateReception,getallPatient,savepatient,updatePatients,getallDepartment,
  deletePatient , viewDoctor, 
  registerDepartment,
  deleteDepartment,
  viewDepartment,
  updateDepartment,
  viewPatient} from './authThunk';
import { jwtDecode } from 'jwt-decode'; 

const initialState = {
  user: null,
  consultant: [],
  consultantId:[],
  Reception:[],
  receptionId:[],
  patient:[],
  patientId : [],
  department : [],
  departmentdIN: [],

  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          state.token = token;
          state.user = decoded;
        } catch (err) {
          state.token = null;
          state.user = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        try {
          const decoded = jwtDecode(action.payload.token);
          state.user = decoded;
        } catch (err) {
          state.user = null;
        }
        localStorage.setItem('token', action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //register

      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })

      //getconsultant Data
      .addCase(getConsltantData.pending,(state)=>{
        state.status="loading"
      })
      .addCase(getConsltantData.fulfilled,(state,action)=>{
        state.status ="succeeded",
        state.consultant=action.payload;
      })
      .addCase(getConsltantData.rejected,(state,action)=>{
        state.status="failed",
        state.error=action.error.message;
      })


      //viewDoctor
      .addCase(viewDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewDoctor.fulfilled, (state, action) => {
       ( state.status = "succeeded"),
        (state.consultantId = action.payload);
      })
      .addCase(viewDoctor.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })


      // doctor  update
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     
      })

     //getallreceptionsit 
      .addCase(getallreception.pending,(state)=>{
        state.status="loading"
      })
      .addCase(getallreception.fulfilled,(state,action)=>{
        state.status="succeeded",
        state.Reception=action.payload;
      })
      .addCase(getallreception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // create Reception
      .addCase(registerReception.pending,(state)=>{
        state.status="loading"
      })
      .addCase(registerReception.fulfilled,(state,action)=>{
        state.status="succeeded",
        state.user=action.payload;
      })
      .addCase(registerReception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
//delete
.addCase(deleteReception.fulfilled, (state, action) => {
  state.data = state.data.filter((patient) => patient._id !== action.payload);

})

//view
.addCase(viewReception.pending, (state) => {
  state.status = "loading";
})
.addCase(viewReception.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.receptionId = action.payload;
})
.addCase(viewReception.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload;
})

//reception update
.addCase(updateReception.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateReception.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  
})
.addCase(updateReception.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;

})

//get all patients

 .addCase(getallPatient.pending,(state)=>{
  state.status="loading"
})
.addCase(getallPatient.fulfilled,(state,action)=>{
  state.status ="succeeded",
  state.patient=action.payload;
})
.addCase(getallPatient.rejected,(state,action)=>{
  state.status="failed",
  state.error=action.error.message;
})

    // create patients
    .addCase(savepatient.pending,(state)=>{
      state.status="loading"
    })
    .addCase(savepatient.fulfilled,(state,action)=>{
      state.status="succeeded",
      state.patient=action.payload;
    })
    .addCase(savepatient.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    })

    //delete
    .addCase(deletePatient.fulfilled, (state, action) => {
      state.data = state.data.filter((patient) => patient._id !== action.payload);
    
    })


    //update patients
    .addCase(updatePatients.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updatePatients.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      
    })
    .addCase(updatePatients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    
    })

    //vire reception
    // .addCase(viewReception.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(viewReception.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.receptionId = action.payload;
    // })
    // .addCase(viewReception.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // })

    .addCase(viewPatient.pending, (state) => {
      state.status = "loading";
    })
    .addCase(viewPatient.fulfilled, (state, action) => {
      (state.status = "succeeded"), (state.patientId = action.payload);
    })
    .addCase(viewPatient.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    })


    //get all departments
    .addCase(getallDepartment.pending,(state)=>{
      state.status="loading"
    })
    .addCase(getallDepartment.fulfilled,(state,action)=>{
      state.status ="succeeded",
      state.department=action.payload;
    })
    .addCase(getallDepartment.rejected,(state,action)=>{
      state.status="failed",
      state.error=action.error.message;
    })
    

    //create departments
    .addCase(registerDepartment.pending,(state)=>{
      state.status="loading"
    })
    .addCase(registerDepartment.fulfilled,(state,action)=>{
      state.status="succeeded",
      state.department=action.payload;
    })
    .addCase(registerDepartment.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    })

//delete department
.addCase(deleteDepartment.fulfilled, (state, action) => {
  state.data = state.data.filter((department) => department._id !== action.payload);

})

//view Department
.addCase(viewDepartment.pending, (state) => {
  state.status = "loading";
})
.addCase(viewDepartment.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.departmentdIN = action.payload;
})
.addCase(viewDepartment.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload;
})

//update department

.addCase(updateDepartment.pending , (state) =>{
  state.status = "loading";
  state.error = "null";
})
.addCase (updateDepartment.fulfilled, (state,action) => {
  state.loading = "false";
  state.user = action.payload;
})
.addCase(updateDepartment.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
})






  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
