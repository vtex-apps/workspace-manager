import {
  LRUCache,
  Service,
  ParamsContext,
} from '@vtex/api'

import { IOClients } from '@vtex/api'
// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

export default new Service<IOClients, State, ParamsContext>({
  clients: {
    implementation: IOClients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  }
})
