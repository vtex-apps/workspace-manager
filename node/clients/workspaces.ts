import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Workspaces extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://platform.io.vtex.com', context,
      {
        ...options,
      })
  }

  public async getWorkspaces() {
    const res = await this.http.getRaw( `/${this.context.account}`, {
      headers: {
        'Authorization': `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res.data
  }

  public async deleteOne(name : String | String[]) {
    const res = await this.http.delete( `/${this.context.account}/${name}`, {
      headers: {
        'Authorization': `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res
  }
}
