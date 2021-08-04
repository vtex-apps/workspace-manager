export async function getAllWorkspaces(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { workspace: workspaceClient },
  } = ctx

  // console.info('Received userId:', userId)
  console.log('llego al middleware');
  const allWorkspaces = await workspaceClient.getAll()

  // console.info('allWorkspaces:', allWorkspaces);

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code)


  ctx.body = allWorkspaces
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
