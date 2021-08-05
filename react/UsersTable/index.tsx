import React, {useState} from 'react'
import {
  Table,
  Tag,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button
} from 'vtex.styleguide'
import { injectIntl, intlShape } from 'react-intl';


// @ts-ignore
const WorkspaceAdmin = ({items, deleteCallback, intl}) => {
  const [workspaceToDelete, setWorkspaceToDelete] = useState<String>('')
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState<String>('')
  const [newWorkspaceType, setNewWorkspaceType] = useState<Boolean>(false)

  const translations = {
    selectProduction:  intl.formatMessage({id :"admin.app.wsmanager.form.options.production"}),
    selectDevelopment: intl.formatMessage({id :"admin.app.wsmanager.form.options.development"}),
    delete: intl.formatMessage({id:"admin.app.wsmanager.delete"}),
    disclaimer: intl.formatMessage({id:"admin.app.wsmanager.form.label.disclaimer"}),
    workspacePlaceHolder: intl.formatMessage({id:"admin.app.wsmanager.form.label.workspacePlaceHolder"}),
    workspaceName: intl.formatMessage({id:"admin.app.wsmanager.form.label.workspaceName"}),
    workspaceType: intl.formatMessage({id:"admin.app.wsmanager.form.label.workspaceType"}),
    workspaceWeight: intl.formatMessage({id:"admin.app.wsmanager.form.label.workspaceWeight"}),
    save: intl.formatMessage({id:"admin.app.wsmanager.actions.save"})
  };

  const selectOptions = [
    {value: true, label: translations.selectProduction },
    {value: false, label: translations.selectDevelopment}
  ]

  const defaultSchema = {
    properties: {
      name: {
        title: translations.workspaceName,
      },
      production: {
        title: translations.workspaceType,
        cellRenderer: ({cellData}: { cellData: boolean }) => {
          return (
            <Tag bgColor={cellData ? 'green' : 'blue'} color="#fff">
              <span className="nowrap">{cellData ? translations.selectProduction : translations.selectDevelopment}</span>
            </Tag>
          )
        },
      },
      weight: {
        title: translations.workspaceWeight
      }
    },
  }

  interface RowHeader {
    rowData: { name: String }
  }

  const lineActions = [
    {
      label: ({rowData}: RowHeader) => `Action for ${rowData.name}`,
      onClick: ({rowData}: RowHeader) => alert(`Executed action for ${rowData.name}`),
    },
    {
      label: ({rowData}: RowHeader) => `Borrar workspace ${rowData.name}`,
      isDangerous: true,
      onClick: ({rowData}: RowHeader) =>
        setWorkspaceToDelete(rowData.name)
    },
  ]

  const deleteWorkspace = (name: String) => {
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
        setTimeout(() => deleteCallback(), 1500)
      })
  }

  const createWorkspace = () => {
    console.log('newWorkspaceName', newWorkspaceName);
    console.log('newWorkspaceType', newWorkspaceType);

    fetch(`https://${window.location.hostname}/_v/workspaces/${newWorkspaceName}/${newWorkspaceType}`,
      {
        credentials: 'include',
        method: 'POST'
      })
      .then(response => response.json())
      .then(json => {
        console.log('create callback')
        setNewWorkspaceName('')
        setNewWorkspaceType(false)
        setTimeout(() => deleteCallback(), 1500)
      })
    setIsModalOpen(false)
  }

  const handleInputChange = (e: any) => {
    setNewWorkspaceName(e);
  }

  return (
    <div>
      {
        workspaceToDelete &&
        <Alert
          type="error"
          action={{label: 'Borrar', onClick: () => deleteWorkspace(workspaceToDelete)}}
          onClose={() => setWorkspaceToDelete('')}>
          {translations.delete} {workspaceToDelete}.
        </Alert>
      }
      <div className="mb5">
        <Table
          fullWidth
          schema={defaultSchema}
          items={items}
          lineActions={lineActions}
          toolbar={{
            newLine: {
              label: 'New',
              handleCallback: () => setIsModalOpen(true),
            },
          }}
        />
        <Modal
          centered
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}>
          <div className="dark-gray">
            <p>
              {translations.disclaimer}
            </p>
            <div
              style={{
                display: 'flex',
              }}>
              <div
                className={'pr4'}
                style={{
                  flex: '1 0 45%'
                }}
              >
                <Input
                  placeholder={translations.workspacePlaceHolder}
                  dataAttributes={{'hj-white-list': true, test: 'workspace-input'}}
                  label={translations.workspaceName}
                  type="text"
                  onChange={(e: any) => handleInputChange(e.target.value)}
                />
              </div>
              <div
                className={'pr4'}
                style={{
                  flex: '1 0 45%'
                }}
              >
                <Dropdown
                  label={translations.workspaceType}
                  options={selectOptions}
                  value={newWorkspaceType}
                  onChange={(_: any, v: Boolean) => setNewWorkspaceType(v)}
                />
              </div>
            </div>
            <div className={"mt4"}>
              <Button variation="primary" onClick={() => createWorkspace()}>
                {translations.save}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

WorkspaceAdmin.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(WorkspaceAdmin);
