import { queries as workspacesQueries } from './workspaces'

export const resolvers = {
  Query: {
    ...workspacesQueries,
  },
}
