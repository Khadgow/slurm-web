import { useController, useFormContext } from 'react-hook-form'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'

type DatePickerProps = { name: string; label: string }

export const DatePicker: React.FC<DatePickerProps> = ({ name, label }) => {
  const { control } = useFormContext()
  const { field } = useController({ control, name })
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MUIDatePicker
        value={field.value}
        onChange={field.onChange}
        label={label}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
