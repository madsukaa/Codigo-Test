import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import allergiesData from "../../data/Allergies.json";
import MTypography from "components/ui/MTypography";
import { updateFormData, nextStage, prevStage } from "config/store/form";
import { AppDispatch, RootState } from "config/store/store";
interface Allergy {
  id: string;
  name: string;
}
const StageFour = () => {
  const dispatch = useDispatch<AppDispatch>();
  const savedAllergies = useSelector((state: RootState) => state.dataSvc.form.formData.allergies as string[] | undefined);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(savedAllergies || []);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Allergy[]>([]);
  useEffect(() => {
    const transformedAllergies = allergiesData.data.map((item: any) => ({
      id: String(item.id),
      name: item.name
    }));
    setAllergies(transformedAllergies);
  }, []);
  useEffect(() => {
    dispatch(updateFormData({
      allergies: selectedAllergies
    }));
  }, [selectedAllergies, dispatch]);
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = allergies.filter(allergy => allergy.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredSuggestions(filtered);
    }
  }, [inputValue, allergies]);
  const addAllergy = (allergy: Allergy) => {
    if (selectedAllergies.includes(allergy.name)) {
      Alert.alert("Duplicate Allergy", "This allergy is already selected.");
      return;
    }
    setSelectedAllergies(prev => [...prev, allergy.name]);
    setInputValue("");
    setFilteredSuggestions([]);
  };
  const removeAllergy = (allergyName: string) => {
    setSelectedAllergies(prev => prev.filter(allergy => allergy !== allergyName));
  };
  const handleNext = () => {
    dispatch(updateFormData({
      allergies: selectedAllergies
    }));
    dispatch(nextStage());
  };
  const handleBack = () => {
    dispatch(prevStage());
  };
  return <View style={styles.container}>
      {}
      <Text style={styles.header}>
        Write any specific allergies or sensitivity towards specific things.
      </Text>
      <Text style={styles.subHeader}>(optional)</Text>

      {}
      <View style={styles.inputContainer}>
        {selectedAllergies.length > 0 ? <FlatList horizontal data={selectedAllergies} keyExtractor={item => item} renderItem={({
        item
      }) => <View style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
                <TouchableOpacity style={styles.chipCloseButton} onPress={() => removeAllergy(item)}>
                  <Text style={styles.chipCloseText}>×</Text>
                </TouchableOpacity>
              </View>} ListFooterComponent={<TextInput style={styles.input} placeholder="Start typing..." value={inputValue} onChangeText={setInputValue} />} showsHorizontalScrollIndicator={false} /> : <TextInput style={[styles.input, styles.fullWidthInput]} placeholder="Start typing..." value={inputValue} onChangeText={setInputValue} />}
      </View>

      {}
      {filteredSuggestions.length > 0 && <FlatList data={filteredSuggestions} renderItem={({
      item
    }) => <TouchableOpacity style={styles.suggestionItem} onPress={() => addAllergy(item)}>
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>} keyExtractor={item => item.id} style={styles.suggestionsList} />}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    minHeight: 60
  },
  fullWidthInput: {
    flex: 1,
    width: "100%"
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10
  },
  chipText: {
    color: "#333",
    marginRight: 5
  },
  chipCloseButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  },
  chipCloseText: {
    color: "#fff",
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    height: 40
  },
  suggestionsList: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 5
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  suggestionText: {
    fontSize: 16,
    color: "#333"
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto"
  },
  button: {
    width: "45%",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  backButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc"
  },
  nextButton: {
    backgroundColor: "#fc685d"
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  }
});
export default StageFour;