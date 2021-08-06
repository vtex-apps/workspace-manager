export async function deleteOneWorkspace(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
    clients: { workspace: workspaceClient },
  } = ctx

  const { name } = params

  const allWorkspaces = await workspaceClient.deleteOne(name)

  if (allWorkspaces.status === 200) {
    ctx.body = { status: 204, message: `Workspace ${name} has been deleted` }
  }
  await next()
}
