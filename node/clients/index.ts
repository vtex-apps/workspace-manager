import { IOClients } from '@vtex/api'

import Workspaces from './workspaces'

export class Clients extends IOClients {
  public get workspace() {
    return this.getOrSet('workspace', Workspaces)
  }
}
