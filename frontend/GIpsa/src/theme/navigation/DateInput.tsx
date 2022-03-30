import React, { forwardRef } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type DateInputProps = ComponentProps<typeof RNTextInput>;

const _TextInput: ForwardRefRenderFunction<RNTextInput, DateInputProps> = (
  { style, ...props },
  ref
) => {
  const { colors } = useTheme();
  return (
    <RNTextInput
      ref={ref}
      style={[
        { color: colors.text, borderColor: colors.text },
        styles.textInput,
        style,
      ]}
      placeholderTextColor={colors.text}
      {...props}
    />
  );
};
export const DateInput = forwardRef(_TextInput);

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    height: 36,
  },
});
