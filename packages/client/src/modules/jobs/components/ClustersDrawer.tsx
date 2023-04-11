import { FC } from 'react'
import { css } from '@emotion/css'
import { Cluster } from '../models'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { Loader } from 'components/Loader'

interface ClustersDrawer {
  clusters?: Cluster[]
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onSelectCluster: (cluster: Cluster) => () => void
  selectedCluster?: Cluster
  drawerWidth: number
}

export const ClustersDrawer: FC<ClustersDrawer> = ({
  isOpen,
  clusters,
  isLoading,
  onSelectCluster,
  onClose,
  onOpen,
  selectedCluster,
  drawerWidth,
}) => {
  if (!isOpen) {
    return (
      <IconButton onClick={onOpen}>
        <ChevronRightIcon />
      </IconButton>
    )
  }

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '64px',
    ...theme.mixins.toolbar,
    p: {
      paddingLeft: '16px',
    },
  }))

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }))
  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        <p>Кластеры</p>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {isLoading && <Loader />}
        {!!clusters?.length &&
          clusters.map((cluster) => (
            <ListItem key={cluster.name}>
              <ListItemButton
                onClick={onSelectCluster(cluster)}
                className={
                  selectedCluster?.name == cluster.name
                    ? css`
                        color: white;
                        background-color: #1976d2;
                        &:hover {
                          background-color: #428ad0;
                        }
                      `
                    : undefined
                }
              >
                {cluster.name}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  )
}
