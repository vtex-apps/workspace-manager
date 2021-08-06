export async function createWorkspace(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { workspace: workspaceClient },
  } = ctx

  const { name, isProduction } = params

  const allWorkspaces = await workspaceClient.createOne(name, isProduction)


  if (allWorkspaces === 201) {
    ctx.body = { status: 201, message: `Workspace ${name} has been created` }
  }

  await next()
}
