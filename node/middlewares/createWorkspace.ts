export async function createWorkspace(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { workspace: workspaceClient },
  } = ctx

  const { name, isProduction } = params

  // console.info('Received userId:', userId)
  console.log('llego al middleware create', name, isProduction);
  const allWorkspaces = await workspaceClient.createOne(name,isProduction)

  console.info('allWorkspaces create', allWorkspaces);

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code)

  if (allWorkspaces === 201) {
    ctx.body = {status: 201, message: `Workspace ${name} has been created`};
  }
  // ctx.set('Cache-Control', headers['cache-control'])
  await next()
}
