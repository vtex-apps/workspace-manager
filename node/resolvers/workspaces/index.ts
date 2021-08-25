/* eslint-disable @typescript-eslint/no-explicit-any */

export const queries = {
  getWorkspaces: async (_: unknown, __: unknown,  ctx: Context): Promise<any> => {
    return await ctx.clients.workspace.getWorkspaces()
  },
}
