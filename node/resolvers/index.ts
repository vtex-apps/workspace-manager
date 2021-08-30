import {
  queries as workspacesQueries,
  mutations as workspacesMutations
} from './workspaces'

export const resolvers = {
  Query: {
    ...workspacesQueries,
  },
  Mutation: {
    ...workspacesMutations
  },
}
