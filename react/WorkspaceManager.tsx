import React, {FC, useEffect, useState} from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import UsersTable from './UsersTable'

import './styles.global.css'

interface Workspace{
  name: string,
  production: string
}

const WorkspaceManager: FC = () => {

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const getWorkspaces = () => {
    console.log('voy a fetchear');
    fetch(`https://${window.location.hostname}/_v/workspaces`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
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
      <PageBlock variation="full">
        <UsersTable />
        {
          workspaces.length > 0 &&
            workspaces.map(work  => (
              <>
                <span>{work.name}</span>
                <span>{work.production}</span>
              </>
            ))
        }
      </PageBlock>
    </Layout>
  )
}

export default WorkspaceManager
