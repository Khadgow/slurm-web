import React from 'react'
import Select, { Options } from 'react-select'
import { FieldError, useController, useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'

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
  const { control, formState } = useFormContext()
  const { field } = useController({ control, name })
  return (
    <>
      <Select
        options={options}
        {...rest}
        value={options?.find((option) => option?.value === field.value)}
        onChange={({ value }) => field.onChange(value)}
        styles={{
          control: (baseStyle) => ({
            ...baseStyle,
            height: '56px',
            borderColor: formState.errors[name] ? '#D32F2F' : '#C4C4C4',
            ':hover': {
              borderColor: formState.errors[name] ? '#D32F2F' : '#212121',
            },
          }),
          menu: (baseStyle) => ({
            ...baseStyle,
            zIndex: 2,
          }),
          placeholder: (baseStyle) => ({
            ...baseStyle,
            color: formState.errors[name] ? '#D32F2F' : '#726A81',
          }),
        }}
      />
      {!!formState.errors[name] && (
        <Typography
          variant="caption"
          style={{ color: 'rgb(211, 47, 47)', margin: '3px 14px 0px 14px' }}
        >
          {(formState.errors[name] as FieldError).message}
        </Typography>
      )}
    </>
  )
}
