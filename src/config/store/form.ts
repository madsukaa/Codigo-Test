import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Concern, FormData } from "../../types/form";
interface FormState {
  currentStage: number;
  formData: FormData;
}
const initialState: FormState = {
  currentStage: 1,
  formData: {}
};
const Form = createSlice({
  name: "FORM",
  initialState,
  reducers: {
    nextStage(state) {
      state.currentStage += 1;
    },
    prevStage(state) {
      if (state.currentStage > 1) {
        state.currentStage -= 1;
      }
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    resetForm(state) {
      state.currentStage = 1;
      state.formData = initialState.formData;
    }
  }
});
export const {
  nextStage,
  prevStage,
  updateFormData,
  resetForm
} = Form.actions;
export default Form.reducer;