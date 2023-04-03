import { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

export const NavbarLink: FC<Omit<NavLinkProps, 'style' | 'className'>> = ({
  children,
  ...props
}) => {
  return (
    <NavLink
      {...props}
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? 'bold' : '',
          color: isActive ? 'whitesmoke' : 'white',
          textDecoration: 'none',
        }
      }}
    >
      {children}
    </NavLink>
  )
}
