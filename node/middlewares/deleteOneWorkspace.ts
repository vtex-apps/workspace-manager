export async function deleteOneWorkspace(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { workspace: workspaceClient },
  } = ctx

  const { name } = params

  // console.info('Received userId:', userId)
  console.log('llego al middleware delete', name);
  const allWorkspaces = await workspaceClient.deleteOne(name)

  // console.info('allWorkspaces:', allWorkspaces);

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code)

  if (allWorkspaces.status === 200) {
    ctx.body = {status: 204, message: `Workspace ${name} has been deleted`};
  }
  else {
    ctx.body = {message: `Error deleting workspace ${name}`};

  }
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
