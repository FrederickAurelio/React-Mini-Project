import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullname, nationalID) {
        return {
          payload: {
            fullname,
            nationalID,
            createdAt: new Date().toISOString(),
            // side-effect make it at prepare, eventhough only 1 payload
          },
        };
      },
      reducer(state, action) {
        state.fullname = action.payload.fullname;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullname = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
