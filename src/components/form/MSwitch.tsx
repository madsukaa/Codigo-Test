import { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Switch, Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Colors } from "../../styles/theme";
interface MSwitchProps {
  name: string;
  label: string;
}
const MSwitch: FunctionComponent<MSwitchProps> = props => {
  const {
    name,
    label
  } = props;
  const {
    control
  } = useFormContext();
  return <View style={globalStyles.switchContainer}>
      <Text style={globalStyles.label}>{label}</Text>
      <Controller control={control} name={name} render={({
      field: {
        onChange,
        value
      }
    }) => <Switch trackColor={{
      false: Colors.disabled,
      true: Colors.primary
    }} thumbColor={value ? Colors.secondary : Colors.background} onValueChange={onChange} value={value} />}></Controller>
    </View>;
};
export default MSwitch;