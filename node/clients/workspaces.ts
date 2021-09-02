import { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
export default class Workspaces extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://platform.io.vtex.com', context, {
      ...options,
    })
  }

  public async getWorkspaces() {
    const res = await this.http.getRaw(`/${this.context.account}`, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res
  }

  public async deleteOne(name: String | String[]) {
    const res = await this.http.delete(`/${this.context.account}/${name}`, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res
  }

  public async createOne(name: String | String[], isProduction: Boolean) {
    const payload = {
      name,
      production: isProduction,
    }
    return await this.http.postRaw(`/${this.context.account}`, payload, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
  }

  public async promote(workspace: String | String[]) {
    const payload = {
      workspace
    }
    return await this.http.putRaw(`/${this.context.account}/master/_promote`, payload, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
  }
}
