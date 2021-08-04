export async function getAllWorkspaces(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { workspaces: workspacesClient },
  } = ctx

  // console.info('Received userId:', userId)
  console.log('llego al middleware');
  const allWorkspaces = await workspacesClient.getAvtll()

  console.info('allWorkspaces:', allWorkspaces);

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await statusClient.getStatusWithHeaders(code)


  ctx.body = allWorkspaces
  // ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
