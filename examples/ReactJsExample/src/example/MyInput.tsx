import React, { CSSProperties, InputHTMLAttributes } from 'react';

export interface MTextInputProps  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label: string;
  error?: boolean;
  helperText?: string;
  style?: MTextInputStyle;
}

export interface MTextInputStyle {
  labelStyle: CSSProperties;
  inputContainerStyle: CSSProperties;
  inputStyle: CSSProperties;
  helperTextStyle: CSSProperties;
  containerStyle: CSSProperties;
}

export const MTextInput = (props: MTextInputProps) => {
  const {helperText, error, label, ...inputProps} = props;

  return (
    <div style={st.containerStyle}>
      <div style={st.labelStyle}>{label}</div>
      <div style={st.inputContainerStyle as React.CSSProperties}>
        <input type={inputProps.type} value={inputProps.value} onChange={inputProps.onChange} style={st.inputStyle} />
      </div>
      {!!error && !!helperText && (
        <div style={st.helperTextStyle}>{helperText}</div>
      )}
    </div>
  );
};

const st = {
  labelStyle: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    paddingVertical: '9px',
    color: '#5D5D5D',
  },
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1px',
  },
  helperTextStyle: {
    color: '#FF3333',
    marginTop: '8px',
  },
  containerStyle: {
    marginBottom: '8px',
  },
};
