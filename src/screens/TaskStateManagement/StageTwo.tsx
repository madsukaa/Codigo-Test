import MDraggableList from "components/ui/MDraggableList";
import MSelectableChips from "components/ui/MSelectableChips";
import MTypography from "components/ui/MTypography";
import { nextStage, prevStage, updateFormData } from "config/store/form";
import { AppDispatch, RootState } from "config/store/store";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { Concern } from "types/form";
import concernsJson from "../../data/Concern.json";
const StageTwo: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedConcerns = useSelector((state: RootState) => state.dataSvc.form.formData.selectedConcerns as Concern[] | undefined);
  const prioritizedConcerns = useSelector((state: RootState) => state.dataSvc.form.formData.priorityConcerns as Concern[] | undefined);
  const [localSelectedConcerns, setLocalSelectedConcerns] = useState<Concern[]>(selectedConcerns || []);
  const [localPrioritizedConcerns, setLocalPrioritizedConcerns] = useState<Concern[]>(prioritizedConcerns || []);
  useEffect(() => {
    dispatch(updateFormData({
      selectedConcerns: localSelectedConcerns,
      priorityConcerns: localPrioritizedConcerns
    }));
  }, [localSelectedConcerns, localPrioritizedConcerns, dispatch]);
  const toggleConcern = (item: Concern) => {
    const isSelected = localSelectedConcerns.some(concern => concern.id === item.id);
    if (isSelected) {
      setLocalSelectedConcerns(localSelectedConcerns.filter(concern => concern.id !== item.id));
      setLocalPrioritizedConcerns(localPrioritizedConcerns.filter(concern => concern.id !== item.id));
    } else if (localSelectedConcerns.length < 5) {
      setLocalSelectedConcerns([...localSelectedConcerns, item]);
      setLocalPrioritizedConcerns([...localSelectedConcerns, item]);
    } else {
      Alert.alert("Selection Limit Reached", "You can select up to 5 concerns.");
    }
  };
  const handleNext = () => {
    if (localSelectedConcerns.length === 0) {
      Alert.alert("Selection Required", "Please select at least one option.");
      return;
    }
    dispatch(nextStage());
  };
  const handleBack = () => {
    dispatch(prevStage());
  };
  const handleDragEnd = (data: Concern[]) => {
    setLocalPrioritizedConcerns(data);
  };
  const renderPrioritizedItem = ({
    item,
    drag,
    isActive
  }: RenderItemParams<Concern>) => {
    return <View style={[styles.draggableItem, {
      backgroundColor: isActive ? "#e0f7fa" : "#ffffff"
    }]}>
        <Text style={styles.draggableText}>{item.label}</Text>
        <Text style={styles.dragHandle} onLongPress={drag}>
          ☰
        </Text>
      </View>;
  };
  const concernsData = concernsJson.data.map((item: {
    id: number;
    name: string;
  }) => ({
    id: String(item.id),
    label: item.name
  }));
  return <View style={styles.container}>
      {}
      <MTypography variant="header">Select Your Health Concerns</MTypography>
      <MTypography variant="subheader">
        You can select up to 5 concerns and prioritize them.
      </MTypography>

      {}
      <MSelectableChips data={concernsData} selectedItems={localSelectedConcerns} onToggle={toggleConcern} keyExtractor={item => item.id} labelExtractor={item => item.label} selectionLimit={5} />

      {}
      <MTypography variant="body" style={styles.sectionTitle}>
        Prioritize Your Concerns
      </MTypography>
      <MDraggableList data={localPrioritizedConcerns} onDragEnd={handleDragEnd} keyExtractor={item => item.id} renderItem={renderPrioritizedItem} />
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
    padding: 20,
    backgroundColor: "#f9f9f9"
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  draggableItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#fff"
  },
  draggableText: {
    fontSize: 16,
    color: "#333"
  },
  dragHandle: {
    fontSize: 18,
    color: "#666"
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto"
  },
  buttonWrapper: {
    padding: 10,
    backgroundColor: "#2196f3",
    borderRadius: 8,
    width: "45%",
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#90caf9"
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
export default StageTwo;