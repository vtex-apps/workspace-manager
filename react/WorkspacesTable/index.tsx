import React, { useEffect, useState } from 'react'
import {
  Table,
  Tag,
  Alert,
  Modal,
  Input,
  Dropdown,
  Button,
  ModalDialog,
  ActionMenu,
  IconExternalLink
} from 'vtex.styleguide'
import { useMutation } from 'react-apollo'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import { RowHeader } from "../typings/workspaces";
import createWorkspaceGQL from './../graphql/createWorkspace.gql';
import promoteWorkspaceGQL from './../graphql/promoteWorkspace.gql';
import deleteWorkspaceGQL from './../graphql/deleteWorkspace.gql';
import { checkWorkspaceName } from "./../utils";


const WorkspaceAdmin = ({ items, callBack, intl, loading }: any) => {
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: ""
  })
  const [newWorkspaceName, setNewWorkspaceName] = useState<string>('')
  const [newWorkspaceType, setNewWorkspaceType] = useState<String>('false')
  const [showCreationAlert, setShowCreationAlert] = useState<Boolean>(false)
  const [state, setState] = useState({
    action: "",
    success: false,
    successMessage: "",
    error: false,
    errorMessage: "",
    errorCreate: ""
  })

  const [createWorkspace,
    {
      loading: loadingCreate,
      error: errorCreate,
      data: dataCreate,
    }] = useMutation(createWorkspaceGQL)

  const [promoteWorkspace,
    {
      loading: loadingPromote,
      error: errorPromote,
      data: dataPromote,
    }] = useMutation(promoteWorkspaceGQL)

  const [deleteWorkspace,
    {
      loading: loadingDelete,
      error: errorDelete,
      data: dataDelete,
    }] = useMutation(deleteWorkspaceGQL)

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
    errorWorkspaceCharacters: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.workspaceCreationError.specialChars',
    }),
    linkAdmin: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.linkAdmin',
    }),
    linkFront: intl.formatMessage({
      id: 'admin/admin.app.wsmanager.actions.linkFront',
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
        cellRenderer: ({ cellData }: { cellData: boolean }) => {
          return (
            <ActionMenu
              label={cellData}
              hideCaretIcon
              align="left"
              buttonProps={{
                icon: <IconExternalLink color="currentColor" />,
                variation: 'tertiary',
              }}
              options={[
                {
                  label: translations.linkFront,
                  onClick: () => window.open(`https://${cellData}--tmehdi.myvtex.com`)
                },
                {
                  label: translations.linkAdmin,
                  onClick: () => window.open(`https://${cellData}--tmehdi.myvtex.com/admin`)
                }
              ]}
            />
          )
        },
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
      }
    },
  }

  const lineActions = [
    {
      label: ({ rowData }: RowHeader) => `${translations.erase} Workspace ${rowData.name}`,
      isDangerous: true,
      onClick: ({ rowData }: RowHeader) => {
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
        setModalOpen({
          isOpen: true,
          type: "promote"
        })
        setWorkspaceName(rowData.name)
        setState(prevState => ({ ...prevState, action: "promote", success: false, successMessage: "" }))
      },
    }
  ]

  useEffect(() => {
    if (loadingCreate) setState(prevState => ({ ...prevState, isLoading: true }))
    if (dataCreate) {
      setModalOpen({
        isOpen: false,
        type: ""
      })
      clearAll()
      setShowCreationAlert(true)
      setState(prevState => ({ ...prevState, error: false, errorMessage: "" }))
    }
    if (errorCreate) {
      setState(prevState => ({ ...prevState, errorCreate: errorCreate.graphQLErrors[0].extensions?.exception?.response?.data?.message }))
    }
  }, [errorCreate, dataCreate, loadingCreate])

  useEffect(() => {
    if (loadingPromote) setState(prevState => ({ ...prevState, isLoading: true }))
    if (dataPromote) {
      setModalOpen({
        isOpen: false,
        type: ""
      })
      clearAll()
      setState(prevState => ({ ...prevState, action: "", success: translations.promoteSuccess }))
    }
    if (errorPromote) {
      setState(prevState => ({ ...prevState, error: true, errorMessage: errorPromote.graphQLErrors[0].extensions?.exception?.response?.data?.message }))
    }
  }, [errorPromote, dataPromote, loadingPromote])

  useEffect(() => {
    if (loadingDelete) setState(prevState => ({ ...prevState, isLoading: true }))
    if (dataDelete) {
      clearAll()
      setState(prevState => ({ ...prevState, action: "", success: translations.deleteSuccess }))
    }
    if (errorDelete) {
      setState(prevState => ({ ...prevState, error: true, errorMessage: errorDelete.graphQLErrors[0].extensions?.exception?.response?.data?.message }))
    }
  }, [errorDelete, dataDelete, loadingDelete])

  const createWorkspaces = () => {
    if (!newWorkspaceName) {
      setState(prevState => ({ ...prevState, action: "create", error: translations.errorEmptyName }))
      return false
    }
    const isValid = checkWorkspaceName(newWorkspaceName);
    if (isValid) {
      createWorkspace({ variables: { name: newWorkspaceName, isProduction: newWorkspaceType } })
    }
    else {
      setState(prevState => ({ ...prevState, error: true, errorMessage: translations.errorWorkspaceCharacters }))
    }
  }

  const promoteWorkspaces = (name: string) => {
    const isValid = checkWorkspaceName(name);
    setModalOpen({
      isOpen: false,
      type: ""
    })
    if (isValid) {
      promoteWorkspace({ variables: { name: name } })
    }
    else {
      setState(prevState => ({ ...prevState, error: true, errorMessage: translations.errorWorkspaceCharacters }))
    }
  }

  const deleteWorkspaces = (name: string) => {
    const isValid = checkWorkspaceName(name);
    setModalOpen({
      isOpen: false,
      type: ""
    })
    if (isValid) {
      deleteWorkspace({ variables: { name: name } })
    }
    else {
      setState(prevState => ({ ...prevState, error: true, errorMessage: translations.errorWorkspaceCharacters }))
    }
  }

  const clearAll = () => {
    setShowCreationAlert(false)
    setNewWorkspaceName('')
    setNewWorkspaceType('false')
    setWorkspaceName("")
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
      errorMessage: "",
      errorCreate: ""
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
        {showCreationAlert && (
          <Alert onClose={() => clearAll()} type="success">{translations.workspaceCreated}.</Alert>
        )}
        {state.error && (
          <>
            <Alert
              type={'error'}
              onClose={() => clearAll()}
            >
              {state.error && state.errorMessage}
            </Alert>
          </>
        )}
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
          confirmation={{
            label: translations.action,
            isDangerous: state.action === 'promote' || state.action === 'delete',
            onClick: state.action === "promote" ?
              () => promoteWorkspaces(workspaceName) :
              () => deleteWorkspaces(workspaceName),
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
                  errorMessage={state.errorCreate}
                  label={translations.workspaceName}
                  type="text"
                  onChange={(e: any) => {
                    handleInputChange(e.target.value)
                    setState(prevState => ({ ...prevState, errorMessage: "", error: false }))
                  }}
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
              <Button variation="primary" onClick={() => createWorkspaces()}>
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
  intl: intlShape.isRequired,
}

export default injectIntl(WorkspaceAdmin)
