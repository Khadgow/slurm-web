import React from 'react'
import Select from 'react-select'
import { useController, useFormContext } from 'react-hook-form'

type MultiSelector = {
  name: string
} & React.ComponentProps<typeof Select>

export const MultiSelector: React.FC<MultiSelector> = ({
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
      isMulti
      value={field.value}
      onChange={field.onChange}
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          height: '56px',
        }),
      }}
    />
  )
}
