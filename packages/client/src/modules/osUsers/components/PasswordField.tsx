import { FC, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface PasswordFieldProps {
  password: string
}

export const PasswordField: FC<PasswordFieldProps> = ({ password }) => {
  const [isPasswordVisibly, setIsPasswordVisibly] = useState(false)

  const onToggleVisibility = () => {
    setIsPasswordVisibly((prevState) => !prevState)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {isPasswordVisibly ? <span>{password}</span> : <span>**********</span>}
      <IconButton onClick={onToggleVisibility}>
        {isPasswordVisibly ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </div>
  )
}
