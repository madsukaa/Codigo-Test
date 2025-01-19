import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MForm from "../../components/form/MForm";
import { Concern, FormBtnConfig } from "../../types/form";
import { nextStage, prevStage, updateFormData } from "../../config/store/form";
import MTypography from "../../components/ui/MTypography";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { AppDispatch, RootState } from "../../config/store/store";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import StageFour from "./StageFour";
import StageFive from "./StageFive";
const StageOne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleNext = () => {
    dispatch(nextStage());
  };
  const handleBack = () => {
    dispatch(prevStage());
  };
  return <>
      <View style={styles.container}>
        <MTypography variant="header">Welcome to DailyVita</MTypography>
        <MTypography variant="subheader">
          Hello, we are here to make your life healthier and happier
        </MTypography>
        <Image source={require("@assets/image1.png")} style={styles.image} resizeMode="contain" />
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>;
};
const MultiStageForm: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const btnConfig: FormBtnConfig = {
    1: [{
      title: "Get started",
      onPress: () => dispatch(nextStage()),
      style: {
        color: "#fff"
      }
    }],
    2: [{
      title: "Back",
      onPress: () => dispatch(prevStage())
    }, {
      title: "Next",
      onPress: () => dispatch(nextStage()),
      style: {
        color: "#fff"
      }
    }],
    3: [{
      title: "Back",
      onPress: () => dispatch(prevStage())
    }, {
      title: "Next",
      onPress: () => dispatch(nextStage()),
      style: {
        color: "#fff"
      }
    }],
    4: [{
      title: "Back",
      onPress: () => dispatch(prevStage())
    }, {
      title: "Next",
      onPress: () => dispatch(nextStage()),
      style: {
        color: "#fff"
      }
    }],
    5: [{
      title: "Get my personalized vitamin",
      isSubmit: true
    }]
  };
  const currStage = useSelector((state: RootState) => state.dataSvc.form.currentStage);
  return <MForm totalStage={5} buttonConfig={btnConfig}>
      {currStage === 1 && <StageOne />}
      {currStage === 2 && <StageTwo />}
      {currStage === 3 && <StageThree />}
      {currStage === 4 && <StageFour />}
      {currStage === 5 && <StageFive />}
    </MForm>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto"
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  nextButton: {
    backgroundColor: "#fc685d"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
export default MultiStageForm;