import { useGetClustersQuery, useGetJobsByClusterNameQuery } from '../api'
import { useEffect, useState } from 'react'
import { Cluster } from '../models'
import { JobsTable } from '../components/JobsTable'
import { ClustersDrawer } from '../components/ClustersDrawer'

export const JobsList = () => {
  const [selectedCluster, setSelectedCluster] = useState<Cluster>()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const onClose = () => {
    setIsDrawerOpen(false)
  }
  const onOpen = () => {
    setIsDrawerOpen(true)
  }

  const onSelectCluster = (cluster: Cluster) => () => {
    setSelectedCluster(cluster)
  }

  const {
    data: clusters,
    isFetching: isClustersFetching,
    isSuccess,
  } = useGetClustersQuery()

  const { data: jobs, isFetching: isJobsFetching } =
    useGetJobsByClusterNameQuery(selectedCluster?.name, {
      skip: !selectedCluster,
    })

  useEffect(() => {
    if (isSuccess && clusters.length && !selectedCluster) {
      setSelectedCluster(clusters[0])
    }
  }, [isSuccess, clusters, selectedCluster])

  const drawerWidth = 240

  return (
    <>
      <ClustersDrawer
        isOpen={isDrawerOpen}
        onClose={onClose}
        onOpen={onOpen}
        onSelectCluster={onSelectCluster}
        clusters={clusters}
        isLoading={isClustersFetching}
        drawerWidth={drawerWidth}
        selectedCluster={selectedCluster}
      />
      <div style={{ marginLeft: isDrawerOpen ? drawerWidth : 0 }}>
        <JobsTable jobs={jobs} isLoading={isJobsFetching} />
      </div>
    </>
  )
}
