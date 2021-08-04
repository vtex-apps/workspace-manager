import { IOClients } from '@vtex/api'

import Workspaces from './workspaces'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get workspace() {
    return this.getOrSet('workspace', Workspaces)
  }
}
