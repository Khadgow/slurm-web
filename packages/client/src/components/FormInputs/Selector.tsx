import React from 'react'
import Select, { Options } from 'react-select'
import { useController, useFormContext } from 'react-hook-form'

export type SelectorOptions = Options<{
  value: number
  label: string
}>

type SelectorProps = {
  name: string
  options: SelectorOptions
} & Omit<React.ComponentProps<typeof Select>, 'options'>

export const Selector: React.FC<SelectorProps> = ({
  name,
  options,
  ...rest
}) => {
  const { control } = useFormContext()
  const { field } = useController({ control, name })
  return (
    <Select
      options={options}
      {...rest}
      value={options?.find((option) => option?.value === field.value)}
      onChange={({ value }) => field.onChange(value)}
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          height: '56px',
          borderColor: '#C4C4C4',
          ':hover': {
            borderColor: '#212121',
          },
        }),
        menu: (baseStyle) => ({
          ...baseStyle,
          zIndex: 2,
        }),
        placeholder: (baseStyle) => ({
          ...baseStyle,
          color: '#726A81',
        }),
      }}
    />
  )
}
