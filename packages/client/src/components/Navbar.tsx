import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import AccountCircle from '@mui/icons-material/AccountCircle'

import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser, useAppDispatch } from 'store'
import { authApi } from 'modules/auth'
import { appActions } from 'store/appSlice'
import { Button, Stack } from '@mui/material'
import { NavbarLink } from './NavbarLink'

const drawerWidth = 240

interface NavbarProps {
  children: React.ReactNode
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const user = useSelector(selectCurrentUser)
  const [isOpen, setIsOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    window.localStorage.removeItem('USER_TOKEN')
    dispatch(appActions.setCurrentUser(null))
    dispatch(authApi.util.resetApiState())
    setAnchorEl(null)
    navigate('/login')
  }

  const onLogin = () => {
    setAnchorEl(null)
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isOpen}>
        <Toolbar>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            marginRight="auto"
          >
            <Typography variant="h6" noWrap component="div" mr="auto">
              Slurm web
            </Typography>
            <NavbarLink to="/jobs">Задачи</NavbarLink>
            <NavbarLink to="/users">Пользователи</NavbarLink>
          </Stack>

          <div>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Typography
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {user?.username}
                  </Typography>
                  <MenuItem onClick={onLogout}>Выйти</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{
                  color: 'white',
                }}
                onClick={onLogin}
              >
                Войти
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
