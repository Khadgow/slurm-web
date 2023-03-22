// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from 'react'
import Select from 'react-select'
import { useController, useFormContext } from 'react-hook-form'

type SelectorProps = {
  name: string
  disableMuiStyle?: boolean
} & React.ComponentProps<typeof Select>

export const Selector: React.FC<SelectorProps> = ({
  name,
  options,
  isMulti,
  disableMuiStyle,
  ...rest
}) => {
  const { control } = useFormContext()
  const { field } = useController({
    control,
    name,
  })

  return (
    <Select
      options={options}
      isMulti={isMulti}
      {...rest}
      value={
        isMulti
          ? options?.filter((option) =>
              field.value?.some((value) => value === option.value)
            )
          : options?.find((option) => option.value === field.value)
      }
      onChange={
        isMulti
          ? (values) => field.onChange(values.map(({ value }) => value))
          : ({ value }) => field.onChange(value)
      }
      styles={
        disableMuiStyle
          ? undefined
          : {
              control: (baseStyle) => ({
                ...baseStyle,
                height: '56px',
              }),
            }
      }
    />
  )
}
