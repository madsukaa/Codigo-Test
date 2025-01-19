import { FunctionComponent } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Colors } from "../../styles/theme";
interface MTextInputProps extends TextInputProps {
  name: string;
  label: string;
  validation?: RegisterOptions;
}
const MTextInput: FunctionComponent<MTextInputProps> = props => {
  const {
    name,
    label,
    placeholder = "",
    validation,
    ...rest
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
      <Controller control={control} name={name} rules={validation} render={({
      field: {
        onChange,
        onBlur,
        value
      }
    }) => <TextInput style={[globalStyles.input, error && globalStyles.inputError, rest.style]} onBlur={onBlur} onChangeText={onChange} value={value} placeholderTextColor={Colors.placeholder} {...rest} />} />
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>;
};
export default MTextInput;