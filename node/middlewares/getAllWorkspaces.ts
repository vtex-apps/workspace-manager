export async function getAllWorkspaces(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { workspace: workspaceClient },
  } = ctx

  const allWorkspaces = await workspaceClient.getWorkspaces()

  ctx.body = allWorkspaces

  await next()
}
