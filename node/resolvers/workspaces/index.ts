/* eslint-disable @typescript-eslint/no-explicit-any */

export const queries = {
  getWorkspaces: async (_: unknown, __: unknown, ctx: Context): Promise<any> => {
    return await ctx.clients.workspace.getWorkspaces()
  },
}

export const mutations = {
  createWorkspace: async (
    _: unknown,
    { name, isProduction }: any,
    ctx: Context
  ): Promise<any> => {
    return await ctx.clients.workspace.createOne(name, isProduction)
  },
  promoteWorkspace: async (
    _: unknown,
    { name }: any,
    ctx: Context
  ): Promise<any> => {
    return await ctx.clients.workspace.promote(name)
  },
  deleteWorkspace: async (
    _: unknown,
    { name }: any,
    ctx: Context
  ): Promise<any> => {
    return await ctx.clients.workspace.deleteOne(name)
  },
}

