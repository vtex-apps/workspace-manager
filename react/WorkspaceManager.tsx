import React, {FC, useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {Layout, PageBlock, PageHeader} from 'vtex.styleguide'

import UsersTable from './WorkspacesTable'

import './styles.global.css'

interface Workspace {
  name: string,
  production: boolean
}

const WorkspaceManager: FC = () => {

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const makeid = (length: Number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  const getWorkspaces = () => {
    setWorkspaces([]);
    let random = makeid(5);
    fetch(`https://${window.location.hostname}/_v/workspaces/${random}/true`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        setWorkspaces(json);
        console.log('json', json);
      })
  }

  useEffect(() => {
    getWorkspaces()
  }, [])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin.app.wsmanager.title"/>}
        />
      }
    >
      <PageBlock
        variation="full"
        subtitle={<FormattedMessage id="admin.app.wsmanager.subtitle"/>}
      >
        <UsersTable items={workspaces} deleteCallback={getWorkspaces}/>
      </PageBlock>
    </Layout>
  )
}

export default WorkspaceManager
