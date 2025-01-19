import MTypography from "components/ui/MTypography";
import { updateFormData, nextStage, prevStage } from "config/store/form";
import { AppDispatch, RootState } from "config/store/store";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { useDispatch } from "react-redux";
import dietData from "../../data/Diets.json";
import Tooltip from "react-native-walkthrough-tooltip";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
interface DietOption {
  id: string;
  label: string;
  description: string;
}
const StageThree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const savedDiets = useSelector((state: RootState) => state.dataSvc.form.formData.diets as string[] | undefined);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(savedDiets || []);
  const [tooltipVisible, setTooltipVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [diets, setDiets] = useState<DietOption[]>([]);
  useEffect(() => {
    const transformedDiets = [{
      id: "none",
      label: "None",
      description: "No specific diet followed."
    }, ...dietData.data.map((item: any) => ({
      id: String(item.id),
      label: item.name,
      description: item.tool_tip
    }))];
    setDiets(transformedDiets);
  }, []);
  useEffect(() => {
    dispatch(updateFormData({
      diets: selectedDiets
    }));
  }, [selectedDiets, dispatch]);
  const toggleDiet = (id: string) => {
    if (id === "none") {
      if (!selectedDiets.includes("none")) {
        setSelectedDiets(["none"]);
      } else {
        setSelectedDiets([]);
      }
    } else {
      setSelectedDiets(prev => {
        if (prev.includes("none")) {
          prev = prev.filter(diet => diet !== "none");
        }
        return prev.includes(id) ? prev.filter(diet => diet !== id) : [...prev, id];
      });
    }
  };
  const handleNext = () => {
    if (selectedDiets.length === 0) {
      Alert.alert("Selection Required", "Please select at least one option.");
      return;
    }
    dispatch(nextStage());
  };
  const handleBack = () => {
    dispatch(prevStage());
  };
  const renderDietItem = ({
    item
  }: {
    item: DietOption;
  }) => {
    const isSelected = selectedDiets.includes(item.id);
    return <View style={styles.itemContainer}>
        <TouchableOpacity style={[styles.checkbox, isSelected && styles.checkboxSelected]} onPress={() => toggleDiet(item.id)}>
          {isSelected && <Text style={styles.checkboxTick}>✔</Text>}
        </TouchableOpacity>
        <Text style={styles.label}>{item.label}</Text>
        {item.id !== "none" && <Tooltip isVisible={tooltipVisible[item.id] || false} content={<Text style={styles.tooltipText}>{item.description}</Text>} placement="top" onClose={() => setTooltipVisible(prev => ({
        ...prev,
        [item.id]: false
      }))}>
            <TouchableOpacity onPress={() => setTooltipVisible(prev => ({
          ...prev,
          [item.id]: !prev[item.id]
        }))}>
              <MaterialIcons name="info-outline" size={24} color="#2196f3" style={styles.infoIcon} />
            </TouchableOpacity>
          </Tooltip>}
      </View>;
  };
  return <View style={styles.container}>
      {}
      <MTypography variant="header">Select the diets you follow.</MTypography>
      <MTypography variant="subheader" style={styles.subtitle}>
        * indicates required field.
      </MTypography>

      {}
      <FlatList data={diets} renderItem={renderDietItem} keyExtractor={item => item.id} contentContainerStyle={styles.listContainer} />
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
  subtitle: {
    marginBottom: 20
  },
  listContainer: {
    marginBottom: 20
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  checkboxSelected: {
    backgroundColor: "#2196f3",
    borderColor: "#2196f3"
  },
  checkboxTick: {
    color: "#fff",
    fontWeight: "bold"
  },
  label: {
    flex: 1,
    fontSize: 16
  },
  infoIcon: {
    marginLeft: 8
  },
  tooltipText: {
    fontSize: 14,
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
export default StageThree;