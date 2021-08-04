import { IOClients } from '@vtex/api'

import Workspaces from './workspaces'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get workspaces() {
    return this.getOrSet('test', Workspaces)
  }
}
