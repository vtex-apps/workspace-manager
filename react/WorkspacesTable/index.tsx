import React, { useState } from 'react'
import {
  Table,
  Tag,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button,
} from 'vtex.styleguide'
import { injectIntl, intlShape } from 'react-intl'
import {RowHeader} from "../typings/workspaces";

const WorkspaceAdmin = ({ items, deleteCallback, intl } : any) => {
  const [workspaceToDelete, setWorkspaceToDelete] = useState<String>('')
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState<String>('')
  const [newWorkspaceType, setNewWorkspaceType] = useState<String>('false')
  const [showCreationAlert, setShowCreationAlert] = useState<Boolean>(false)
  const [showCreationError, setShowCreationError] = useState<String>('')
  const [workspaceDeleteError, setWorkspaceDeleteError] = useState<String>('')
  const [deleteSuccess, setDeleteSuccess] = useState<Boolean>(false)

  const translations = {
    selectProduction: intl.formatMessage({
      id: 'admin.app.wsmanager.form.options.production',
    }),
    selectDevelopment: intl.formatMessage({
      id: 'admin.app.wsmanager.form.options.development',
    }),
    delete: intl.formatMessage({ id: 'admin.app.wsmanager.delete' }),
    deleteSuccess: intl.formatMessage({
      id: 'admin.app.wsmanager.delete.success',
    }),
    deleteSame: intl.formatMessage({
      id: 'admin.app.wsmanager.delete.deleteSame',
    }),
    disclaimer: intl.formatMessage({
      id: 'admin.app.wsmanager.form.label.disclaimer',
    }),
    workspacePlaceHolder: intl.formatMessage({
      id: 'admin.app.wsmanager.form.label.workspacePlaceHolder',
    }),
    workspaceName: intl.formatMessage({
      id: 'admin.app.wsmanager.form.label.workspaceName',
    }),
    workspaceType: intl.formatMessage({
      id: 'admin.app.wsmanager.form.label.workspaceType',
    }),
    workspaceWeight: intl.formatMessage({
      id: 'admin.app.wsmanager.form.label.workspaceWeight',
    }),
    save: intl.formatMessage({ id: 'admin.app.wsmanager.actions.save' }),
    erase: intl.formatMessage({ id: 'admin.app.wsmanager.actions.delete' }),
    newWs: intl.formatMessage({ id: 'admin.app.wsmanager.actions.newWs' }),
    workspaceCreated: intl.formatMessage({
      id: 'admin.app.wsmanager.actions.workspaceCreated',
    }),
    workspaceCreationError: intl.formatMessage({
      id: 'admin.app.wsmanager.actions.workspaceCreationError',
    }),
    errorEmptyName: intl.formatMessage({
      id: 'admin.app.wsmanager.actions.workspaceCreationError.emptyName',
    }),
  }
  const selectOptions = [
    { value: 'true', label: translations.selectProduction },
    { value: 'false', label: translations.selectDevelopment },
  ]
  const defaultSchema = {
    properties: {
      name: {
        title: translations.workspaceName,
      },
      production: {
        title: translations.workspaceType,
        cellRenderer: ({ cellData }: { cellData: boolean }) => {
          return (
            <Tag bgColor={cellData ? '#f71963' : '#134cd8'} color="#fff">
              <span className="nowrap">
                {cellData
                  ? translations.selectProduction
                  : translations.selectDevelopment}
              </span>
            </Tag>
          )
        },
      },
      weight: {
        title: translations.workspaceWeight,
      },
    },
  }
  const lineActions = [
    {
      label: ({ rowData }: RowHeader) => `${translations.erase} Workspace ${rowData.name}`,
      isDangerous: true,
      onClick: ({ rowData }: RowHeader) => setWorkspaceToDelete(rowData.name),
    },
  ]

  const deleteWorkspace = (name: String) => {
    fetch(`https://${window.location.hostname}/_v/workspaces/delete/${name}`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json?.status === 204) {
          setWorkspaceDeleteError(translations.deleteSuccess)
          setDeleteSuccess(true)
        } else {
          setWorkspaceDeleteError(`${json?.response?.data?.message}`)
        }
        setTimeout(() => clearAll(), 2000)
      })
  }
  const createWorkspace = () => {
    if (!newWorkspaceName) {
      setShowCreationError(`${translations.errorEmptyName}`)
      return false
    }

    fetch(
      `https://${window.location.hostname}/_v/workspaces/${newWorkspaceName}/${newWorkspaceType}`,
      {
        credentials: 'include',
        method: 'POST',
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 201) {
          setShowCreationAlert(true)
          setTimeout(() => clearAll(), 2000)
        } else {
          setShowCreationError(`${json.response.data.message}.`)
        }
      })
  }
  const clearAll = () => {
    setShowCreationError('')
    setShowCreationAlert(false)
    setNewWorkspaceName('')
    setNewWorkspaceType('false')
    setWorkspaceToDelete('')
    setWorkspaceDeleteError('')
    setDeleteSuccess(false)
    setIsModalOpen(false)
    deleteCallback()
  }
  const handleSelectChange = (value: String) => {
    setNewWorkspaceType(value)
  }
  const handleInputChange = (e: any) => {
    setNewWorkspaceName(e)
    setShowCreationError('')
  }

  return (
    <div>
      <div className={'mv4'}>
        {(workspaceToDelete || (workspaceDeleteError && !deleteSuccess)) && (
          <Alert
            type={'error'}
            action={{
              label: translations.erase,
              onClick: () => deleteWorkspace(workspaceToDelete),
            }}
            onClose={() => clearAll()}
          >
            {workspaceDeleteError ? '' : translations.delete}{' '}
            {workspaceToDelete} {workspaceDeleteError}.
          </Alert>
        )}
        {deleteSuccess && (
          <Alert type={'success'} onClose={() => clearAll()}>
            {workspaceDeleteError ? '' : translations.delete}{' '}
            {workspaceToDelete} {workspaceDeleteError}.
          </Alert>
        )}
      </div>
      <div className="mb5">
        <Table
          fullWidth
          schema={defaultSchema}
          items={items}
          lineActions={lineActions}
          toolbar={{
            newLine: {
              label: translations.newWs,
              handleCallback: () => setIsModalOpen(true),
            },
          }}
        />
        <Modal centered isOpen={isModalOpen} onClose={() => clearAll()}>
          <div className="dark-gray">
            <p>{translations.disclaimer}</p>
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                className={'pr4'}
                style={{
                  flex: '1 0 45%',
                }}
              >
                <Input
                  placeholder={translations.workspacePlaceHolder}
                  dataAttributes={{
                    'hj-white-list': true,
                    test: 'workspace-input',
                  }}
                  label={translations.workspaceName}
                  type="text"
                  onChange={(e: any) => handleInputChange(e.target.value)}
                />
              </div>
              <div
                className={'pr4'}
                style={{
                  flex: '1 0 45%',
                }}
              >
                <Dropdown
                  label={translations.workspaceType}
                  options={selectOptions}
                  value={newWorkspaceType}
                  onChange={(_: any, v: String) => handleSelectChange(v)}
                />
              </div>
            </div>
            <div className={'mv4'}>
              <Button variation="primary" onClick={() => createWorkspace()}>
                {translations.save}
              </Button>
            </div>
            {showCreationAlert && (
              <Alert type="success">{translations.workspaceCreated}.</Alert>
            )}
            {showCreationError && (
              <Alert type="error">
                {showCreationError ?? `${showCreationError}`}{' '}
                {translations.workspaceCreationError}.
              </Alert>
            )}
          </div>
        </Modal>
      </div>
    </div>
  )
}

WorkspaceAdmin.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(WorkspaceAdmin)
