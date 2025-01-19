import { Picker } from "@react-native-picker/picker";
import { FunctionComponent } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
interface PickerOption {
  label: string;
  value: string;
}
interface MPickerProps {
  name: string;
  label: string;
  options: PickerOption[];
  validation?: RegisterOptions;
}
const MPicker: FunctionComponent<MPickerProps> = props => {
  const {
    name,
    label,
    options,
    validation
  } = props;
  const {
    control,
    formState: {
      errors
    }
  } = useFormContext();
  const error = errors[name]?.message as string;
  return <View style={{
    marginBottom: 16
  }}>
      <Text style={globalStyles.label}>{label}</Text>
      <Controller control={control} name={name} render={({
      field: {
        onChange,
        value
      }
    }) => <View style={globalStyles.picker}>
            <Picker selectedValue={value} onValueChange={value => onChange(value)} style={{
        height: 50,
        width: "100%"
      }}>
              <Picker.Item label="Select an option" value="" />
              {options.map(option => <Picker.Item key={option.value} label={option.label} value={option.value} />)}
            </Picker>
          </View>} />
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>;
};
export default MPicker;