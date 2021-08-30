/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import WorkspacesTable from './WorkspacesTable'

import './styles.global.css'
import { Workspace } from "./typings/workspaces";
import { makeid } from "./utils";
import getWorkspaces from './graphql/getWorkspaces.gql'



const WorkspaceManager: FC = () => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const currentWorkspace = (window as any).__RUNTIME__.workspace

  // const [getWorkspaceQuery, { loading: loadingGetWorkspace, error: errorGetWorkspace, data: dataGetWorkspace }] = useQuery(getWorkspaces)
  // const getWorkspaceQuery = useQuery(getWorkspaces)
  const { loading: loadingWorkspaces, error: errorWorkspaces, data: dataWorkspaces, refetch } = useQuery(getWorkspaces);

  useEffect(() => {
    if (dataWorkspaces) {
      // shows only the workspaces that don't match with the current one and master (they are not deletable)
      setWorkspaces(dataWorkspaces.getWorkspaces?.data?.filter((i: any) => i.name !== currentWorkspace && i.name !== 'master'))
      setLoading(false)
    }
  }, [dataWorkspaces])

  console.log("workspaces", workspaces)
  /*
    const getWorkspaces = () => {
      setLoading(true)
      setWorkspaces([])
      let random = makeid(5)
      fetch(`https://${window.location.hostname}/_v/workspaces/${random}/true`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          setLoading(false)
          setWorkspaces(json.filter((i: any) => i.name !== currentWorkspace && i.name !== 'master'))
        })
    } */
  useEffect(() => {
    // getWorkspaces()
  }, [])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/admin.app.wsmanager.title" />}
        />
      }
    >
      <PageBlock
        variation="full"
        subtitle={<FormattedMessage id="admin/admin.app.wsmanager.subtitle" />}
      >
        <WorkspacesTable loading={loading} items={workspaces} callBack={() => refetch()} />
      </PageBlock>
    </Layout>
  )
}

export default WorkspaceManager
