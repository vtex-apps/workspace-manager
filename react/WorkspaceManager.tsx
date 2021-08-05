import React, {FC, useEffect, useState} from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, FloatingActionBar } from 'vtex.styleguide'

import UsersTable from './UsersTable'

import './styles.global.css'

interface Workspace{
  name: string,
  production: boolean
}

const WorkspaceManager: FC = () => {

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getWorkspaces = () => {
    console.log('voy a fetchear');
    fetch(`https://${window.location.hostname}/_v/workspaces`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        setWorkspaces(json);
      })
  }

  useEffect(()=> {
    getWorkspaces()
  },[])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin.app.wsmanager.title" />}
        />
      }
    >
      <PageBlock
        variation="full"
      subtitle={<FormattedMessage id="admin.app.wsmanager.subtitle" />}
      >
        <UsersTable items={workspaces} deleteCallback={getWorkspaces}/>
      </PageBlock>
    </Layout>
  )
}

export default WorkspaceManager
