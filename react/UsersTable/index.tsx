import React, {useState} from 'react'
import {
  Table,
  Tag,
  Alert
} from 'vtex.styleguide'
import faker from 'faker'



export interface items {
  name: string
  production: boolean
}

// @ts-ignore
const WorkspaceAdmin = ({items, deleteCallback}) => {
  const [workspaceToDelete, setWorkspaceToDelete] = useState<String>('')

  const defaultSchema = {
    properties: {
      name: {
        title: 'Name',
      },
      production: {
        title: 'Type',
        cellRenderer: ({ cellData }: { cellData: boolean }) => {
          return (
            <Tag bgColor={cellData ? 'green' : 'blue'} color="#fff">
              <span className="nowrap">{cellData ? 'Produccion' : 'Desarrollo'}</span>
            </Tag>
          )
        },
      },
      weight: {
        title: 'Weight'
      }
    },
  }

  interface RowHeader {
    rowData: { name: String}
  }

  const lineActions = [
    {
      label: ({ rowData } : RowHeader) => `Action for ${rowData.name}`,
      onClick: ({ rowData }: RowHeader) => alert(`Executed action for ${rowData.name}`),
    },
    {
      label: ({ rowData }: RowHeader) => `Borrar workspace ${rowData.name}`,
      isDangerous: true,
      onClick: ({ rowData }: RowHeader) =>
        setWorkspaceToDelete(rowData.name)
    },
  ]

  const deleteWorkspace = (name : String) => {
    console.log('voy a borrar', name);
    fetch(`https://${window.location.hostname}/_v/workspaces/delete/${name}`,
      {
        credentials: 'include',
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(json => {
        console.log('delete callback')
        setWorkspaceToDelete('')
        setTimeout(() => deleteCallback(),1500)
      })
  }

  return (
    <div>
      {
        workspaceToDelete &&
        <Alert
          type="error"
          action={{ label: 'Borrar', onClick: () => deleteWorkspace(workspaceToDelete) }}
          onClose={() => setWorkspaceToDelete('')}>
          You are about to delete workspace {workspaceToDelete}.
        </Alert>
      }
      <div className="mb5">
        <Table
          fullWidth
          schema={defaultSchema}
          items={items}
          lineActions={lineActions}
        />
      </div>
    </div>
  )
}

export default WorkspaceAdmin;
