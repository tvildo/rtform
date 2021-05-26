import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
  TextInputProps,
  StyleSheet,
} from 'react-native';

export interface MTextInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: boolean;
  helperText?: string;
  style?: MTextInputStyle;
}

export interface MTextInputStyle {
  labelStyle: TextStyle;
  inputContainerStyle: ViewStyle;
  inputStyle: TextStyle;
  helperTextStyle: TextStyle;
  containerStyle: ViewStyle;
}

export const MTextInput: React.FC<MTextInputProps> = (props) => {
  const {helperText, error, label, ...inputProps} = props;

  return (
    <View style={st.containerStyle}>
      {/* Label */}
      <Text style={st.labelStyle}>{label}</Text>
      <View style={st.inputContainerStyle}>
        {/* Input */}
        <TextInput {...inputProps} style={st.inputStyle} />
      </View>
      {/* Error text */}
      {!!error && !!helperText && (
        <Text style={st.helperTextStyle}>{helperText}</Text>
      )}
    </View>
  );
};

const st = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 9,
    color: '#5D5D5D',
  },
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  helperTextStyle: {
    color: '#FF3333',
    marginTop: 8,
  },
  containerStyle: {
    marginBottom: 8,
  },
});
