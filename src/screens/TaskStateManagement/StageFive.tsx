import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { updateFormData, nextStage, resetForm } from "config/store/form";
import { AppDispatch, RootState } from "config/store/store";
import { RootStackParamList } from "navigation/AppNavigator";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
type FormNavigationProp = StackNavigationProp<RootStackParamList, "MultiStageForm">;
const StageFive = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<FormNavigationProp>();
  const formData = useSelector((state: RootState) => state.dataSvc.form.formData);
  const [sunExposure, setSunExposure] = useState<string>(formData.sunExposure || "Yes");
  const [smoking, setSmoking] = useState<string>(formData.smoking || "No");
  const [alcoholConsumption, setAlcoholConsumption] = useState<string>(formData.alcoholConsumption || "0 - 1");
  useEffect(() => {
    dispatch(updateFormData({
      sunExposure,
      smoking,
      alcoholConsumption
    }));
  }, [sunExposure, smoking, alcoholConsumption, dispatch]);
  const handleSubmit = () => {
    if (!sunExposure || !smoking || !alcoholConsumption) {
      Alert.alert("Missing Information", "Please answer all questions.");
      return;
    }
    Alert.alert("Success", "Your personalized vitamin recommendation is ready!");
    console.log("check Form Data:", formData);
    dispatch(resetForm());
    navigation.navigate("NavigationDefault");
  };
  const RadioButton = ({
    label,
    value,
    selectedValue,
    onSelect
  }: {
    label: string;
    value: string;
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => {
    const isSelected = value === selectedValue;
    return <TouchableOpacity style={styles.radioContainer} onPress={() => onSelect(value)}>
        <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
      </TouchableOpacity>;
  };
  return <View style={styles.container}>
      {}
      <Text style={styles.question}>
        Is your daily exposure to sun limited?{" "}
        <Text style={styles.required}>*</Text>
      </Text>
      <RadioButton label="Yes" value="Yes" selectedValue={sunExposure} onSelect={setSunExposure} />
      <RadioButton label="No" value="No" selectedValue={sunExposure} onSelect={setSunExposure} />

      {}
      <Text style={styles.question}>
        Do you currently smoke (tobacco or marijuana)?{" "}
        <Text style={styles.required}>*</Text>
      </Text>
      <RadioButton label="Yes" value="Yes" selectedValue={smoking} onSelect={setSmoking} />
      <RadioButton label="No" value="No" selectedValue={smoking} onSelect={setSmoking} />

      {}
      <Text style={styles.question}>
        On average, how many alcoholic beverages do you have in a week?{" "}
        <Text style={styles.required}>*</Text>
      </Text>
      <RadioButton label="0 - 1" value="0 - 1" selectedValue={alcoholConsumption} onSelect={setAlcoholConsumption} />
      <RadioButton label="2 - 5" value="2 - 5" selectedValue={alcoholConsumption} onSelect={setAlcoholConsumption} />
      <RadioButton label="5+" value="5+" selectedValue={alcoholConsumption} onSelect={setAlcoholConsumption} />

      {}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Get my personalized vitamin</Text>
      </TouchableOpacity>
    </View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  required: {
    color: "red"
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  radioCircleSelected: {
    borderColor: "#fc685d"
  },
  radioDot: {
    width: 12,
    height: 12,
    backgroundColor: "#fc685d",
    borderRadius: 6
  },
  radioLabel: {
    fontSize: 16,
    color: "#333"
  },
  submitButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#fc685d",
    alignItems: "center"
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default StageFive;