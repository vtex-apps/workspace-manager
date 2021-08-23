import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import WorkspacesTable from './WorkspacesTable'

import './styles.global.css'
import { Workspace } from "./typings/workspaces";
import { makeid } from "./utils";



const WorkspaceManager: FC = () => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const currentWorkspace = (window as any).__RUNTIME__.workspace

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
  }

  useEffect(() => {
    getWorkspaces()
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
        <WorkspacesTable loading={loading} items={workspaces} callBack={getWorkspaces} />
      </PageBlock>
    </Layout>
  )
}

export default WorkspaceManager