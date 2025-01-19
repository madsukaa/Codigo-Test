import { FunctionComponent, ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nextStage, prevStage, resetForm, updateFormData } from "../../config/store/form";
import { FormBtn, FormBtnConfig, FormInputs } from "../../types/form";
import { AppDispatch, RootState } from "../../config/store/store";
import React from "react";
interface MFormProps {
  children: ReactNode;
  totalStage: number;
  buttonConfig: FormBtnConfig;
}
const MForm: FunctionComponent<MFormProps> = props => {
  const {
    children,
    totalStage,
    buttonConfig
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const {
    formData,
    currentStage
  } = useSelector((state: RootState) => state.dataSvc.form);
  const btns: FormBtn[] = buttonConfig[currentStage] || [];
  const methods = useForm<FormInputs>({
    defaultValues: formData
  });
  const {
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = methods;
  const onSubmit = (data: FormInputs) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(updateFormData({
        field,
        value
      }));
    });
    if (currentStage < totalStage) {
      dispatch(nextStage());
    } else {
      console.log("Detail Form:", formData);
    }
  };
  const handlePrev = () => {
    dispatch(prevStage());
  };
  return <FormProvider {...methods}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        {children}
        {isSubmitting && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      </KeyboardAvoidingView>
    </FormProvider>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    fontWeight: "700"
  },
  btnWrapper: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#2196f3",
    borderRadius: 8,
    width: "45%",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  },
  loader: {
    marginTop: 20
  }
});
export default MForm;