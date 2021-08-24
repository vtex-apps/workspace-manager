import { LRUCache, method, Service, ParamsContext } from '@vtex/api'

import { getAllWorkspaces } from './middlewares/getAllWorkspaces'
import { deleteOneWorkspace } from './middlewares/deleteOneWorkspace'
import { createWorkspace } from './middlewares/createWorkspace'
import { promoteWorkspace } from './middlewares/promoteWorkspace'
import { Clients } from './clients'
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    workspaces: method({
      GET: [getAllWorkspaces],
      POST: [createWorkspace],
    }),
    wsdelete: method({
      DELETE: [deleteOneWorkspace],
    }),
    wspromote: method({
      PUT: [promoteWorkspace],
    }),
  },
})
