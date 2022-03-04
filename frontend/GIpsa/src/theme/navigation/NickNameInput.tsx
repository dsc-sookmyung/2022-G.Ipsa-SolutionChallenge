import React, {forwardRef} from 'react'
import type {ForwardRefRenderFunction, ComponentProps} from 'react'
import {StyleSheet, TextInput as RNTextInput} from 'react-native'
import {useTheme} from '@react-navigation/native'

export type NickNameInputProps = ComponentProps<typeof RNTextInput>

const _TextInput: ForwardRefRenderFunction<RNTextInput, NickNameInputProps> = (
  {style, ...props},
  ref
) => {
  const {colors} = useTheme()
  return (
    <RNTextInput
      ref={ref}
      style={[
        {color: colors.text, borderColor: colors.text},
        styles.textInput,
        style
      ]}
      placeholderTextColor={colors.text}
      {...props}
    />
  )
}
export const NickNameInput = forwardRef(_TextInput)

const styles = StyleSheet.create({
  textInput: {borderWidth: 1, borderRadius: 5}
})
