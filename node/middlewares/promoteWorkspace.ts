export async function promoteWorkspace(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
        clients: { workspace: workspaceClient },
    } = ctx

    const { workspace } = params

    const allWorkspaces = await workspaceClient.promote(workspace)


    if (allWorkspaces === 200) {
        ctx.body = { status: 204, message: `Workspace ${workspace} has been promoted` }
    }

    await next()
}
