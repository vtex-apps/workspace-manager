import React, { useState } from 'react'
import {
  Table,
  Tag,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button,
  ModalDialog
} from 'vtex.styleguide'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { RowHeader } from "../typings/workspaces";

const WorkspaceAdmin = ({ items, callBack, intl, loading }: any) => {
  // const [workspaceToDelete, setWorkspaceToDelete] = useState<String>('')
  // const [workspaceToPromote, setWorkspaceToPromote] = useState<String>('')
  const [workspaceName, setWorkspaceName] = useState<String>('')
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: ""
  })
  const [newWorkspaceName, setNewWorkspaceName] = useState<String>('')
  const [newWorkspaceType, setNewWorkspaceType] = useState<String>('false')
  const [showCreationAlert, setShowCreationAlert] = useState<Boolean>(false)
  // const [showCreationError, setShowCreationError] = useState<String>('')
  const [state, setState] = useState({
    action: "",
    success: false,
    successMessage: "",
    error: false,
    errorMessage: ""
  })

  const translations: any = {
    selectProduction: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.options.production',
    }),
    selectDevelopment: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.options.development',
    }),
    delete: intl.formatMessage({ id: 'admin/admin.app.wsmanager.delete' }),
    promote: intl.formatMessage({ id: 'admin/admin.app.wsmanager.promote' }),
    action: intl.formatMessage({ id: 'admin/admin.app.wsmanager.action' }),
    deleteSuccess: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.delete.success',
    }),
    promoteSuccess: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.promote.success',
    }),
    deleteSame: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.delete.deleteSame',
    }),
    disclaimer: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.label.disclaimer',
    }),
    workspacePlaceHolder: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.label.workspacePlaceHolder',
    }),
    workspaceName: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.label.workspaceName',
    }),
    workspaceType: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.label.workspaceType',
    }),
    workspaceWeight: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.form.label.workspaceWeight',
    }),
    save: intl.formatMessage({ id: 'admin/admin.app.wsmanager.actions.save' }),
    erase: intl.formatMessage({ id: 'admin/admin.app.wsmanager.actions.delete' }),
    promoteAction: intl.formatMessage({ id: 'admin/admin.app.wsmanager.actions.promote' }),
    newWs: intl.formatMessage({ id: 'admin/admin.app.wsmanager.actions.newWs' }),
    workspaceCreated: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.workspaceCreated',
    }),
    workspaceCreationError: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.workspaceCreationError',
    }),
    errorEmptyName: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.workspaceCreationError.emptyName',
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
      onClick: ({ rowData }: RowHeader) => {
        // clearAll()
        setModalOpen({
          isOpen: true,
          type: "delete"
        })
        setWorkspaceName(rowData.name)
        setState(prevState => ({ ...prevState, action: "delete", success: false, successMessage: "" }))
      },
    },
    {
      label: ({ rowData }: RowHeader) => `${translations.promoteAction} Workspace ${rowData.name}`,
      isDangerous: true,
      onClick: ({ rowData }: RowHeader) => {
        // clearAll()
        setModalOpen({
          isOpen: true,
          type: "promote"
        })
        setWorkspaceName(rowData.name)
        setState(prevState => ({ ...prevState, action: "promote", success: false, successMessage: "" }))
      },
    },
  ]

  const deleteWorkspace = (name: String) => {
    fetch(`https://${window.location.hostname}/_v/workspaces/delete/${name}`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        setModalOpen({
          isOpen: false,
          type: ""
        })
        if (json?.status === 204) {
          setState(prevState => ({ ...prevState, action: "", success: translations.deleteSuccess }))
        } else {
          setState(prevState => ({ ...prevState, action: "", error: true, errorMessage: `${json?.response?.data?.message}` }))
        }
        callBack()
        // setTimeout(() => clearAll(), 3000)
      })
  }
  const createWorkspace = () => {

    if (!newWorkspaceName) {
      setState(prevState => ({ ...prevState, action: "create", error: translations.errorEmptyName }))
      // setShowCreationError(`${translations.errorEmptyName}`)
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
        setModalOpen({
          isOpen: false,
          type: ""
        })
        if (json.status === 201) {
          clearAll()
          setShowCreationAlert(true)
          setState(prevState => ({ ...prevState, error: false, errorMessage: "" }))
          // clearAll()
          // setTimeout(() => clearAll(), 3000)
        } else {
          setState(prevState => ({ ...prevState, action: "create", error: true, errorMessage: json.response.data.message }))
          // setShowCreationError(`${json.response.data.message}.`)
        }
        // setTimeout(() => clearAll(), 2000)
      })
  }

  const promoteWorkspace = (workspace: String) => {
    fetch(`https://${window.location.hostname}/_v/workspaces/promote/${workspace}`,
      {
        credentials: 'include',
        method: 'PUT',
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setModalOpen({
          isOpen: false,
          type: ""
        })
        if (json?.status === 204) {
          clearAll()
          setState(prevState => ({ ...prevState, action: "", success: translations.promoteSuccess }))
        } else {
          setState(prevState => ({ ...prevState, action: "", error: true, errorMessage: `${json?.response?.data?.message}` }))
        }
        // setTimeout(() => clearAll(), 2000)
      })
  }

  const clearAll = () => {
    // setShowCreationError('')
    setShowCreationAlert(false)
    setNewWorkspaceName('')
    setNewWorkspaceType('false')
    setWorkspaceName("")
    // setWorkspaceToDelete('')
    // setWorkspaceToPromote('')
    setModalOpen({
      isOpen: false,
      type: ""
    })
    callBack()
    setState({
      action: "",
      error: false,
      success: false,
      successMessage: "",
      errorMessage: ""
    })
  }
  const handleSelectChange = (value: String) => {
    setNewWorkspaceType(value)
  }
  const handleInputChange = (e: any) => {
    setNewWorkspaceName(e)
  }

  const handleNewModal = () => {
    setState(prevState => ({ ...prevState, error: false, errorMessage: "" }))
    setModalOpen({
      isOpen: true,
      type: "create"
    })
  }
  return (
    <div>
      <div className={'mv4'}>
        {console.log("showCreationAlert", showCreationAlert)}
        {showCreationAlert && (
          <Alert onClose={() => clearAll()} type="success">{translations.workspaceCreated}.</Alert>
        )}
        {console.log("state.action", state.action !== "")}

        {state.error ? (
          <>
            <Alert
              type={'error'}
              /*  action={{
                 label: translations.action,
                 onClick: state.action === "promote" ?
                   () => promoteWorkspace(workspaceName) :
                   () => deleteWorkspace(workspaceName),
               }} */
              onClose={() => clearAll()}
            >
              {state.error && state.errorMessage}
            </Alert>
          </>
        ) : null}
        {state.success && (
          <Alert type={'success'} onClose={() => clearAll()}>
            {state.success}
          </Alert>
        )}
      </div>
      <div className="mb5">
        <Table
          loading={loading}
          fullWidth
          schema={defaultSchema}
          items={items}
          lineActions={lineActions}
          toolbar={{
            newLine: {
              label: translations.newWs,
              handleCallback: handleNewModal,
            },
          }}
        />
        {modalOpen.isOpen && <ModalDialog
          centered
          // loading={loading}
          confirmation={{
            label: translations.action,
            onClick: state.action === "promote" ?
              () => promoteWorkspace(workspaceName) :
              () => deleteWorkspace(workspaceName),
          }}
          cancelation={{
            onClick: () => clearAll(),
            label: 'Cancel',
          }}
          isOpen={modalOpen.type !== "create"}
          onClose={() => clearAll()}>
          <div className="">
            <p className="f3 f3-ns fw3 gray">
              {translations[state.action]} <span className={'c-action-primary fw5'}> {workspaceName} </span>
            </p>
            <p>
              <FormattedMessage id="admin/admin.app.wsmanager.subtitle" />
            </p>
          </div>
        </ModalDialog>}
        {console.log(modalOpen)}
        <Modal centered isOpen={modalOpen.isOpen && modalOpen.type === "create"} onClose={() => clearAll()}>
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
                  error={state.action === "create" && state.error}
                  errorMessage={state.errorMessage}
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
            {/*  {showCreationError && (
              <Alert type="error">
                {showCreationError ?? `${showCreationError}`}{' '}
                {translations.workspaceCreationError}.
              </Alert>
            )} */}
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
