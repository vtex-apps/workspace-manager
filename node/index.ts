import {
  LRUCache,
  method,
  Service,
  ParamsContext,
} from '@vtex/api'

import { getAllWorkspaces } from './middlewares/getAllWorkspaces'

// import { IOClients } from '@vtex/api'
import { Clients } from './clients'
// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
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
      GET:[getAllWorkspaces]
    })
  }
})
