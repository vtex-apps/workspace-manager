import type { InstanceOptions, IOContext } from '@vtex/api'
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
  //TODO: VER CÓMO MANEJAR LOS ERRORES
  public async createOne(name: String | String[], isProduction: Boolean) {
    const payload = {
      name,
      production: isProduction,
    }
    try {
      const res = await this.http.postRaw(`/${this.context.account}`, payload, {
        headers: {
          Authorization: `Bearer ${this.context.adminUserAuthToken}`,
        },
      })
      return res.status
    } catch (err) {
      return err
    }
  }

  public async promote(workspace: String | String[]) {
    const payload = {
      workspace
    }
    const res = await this.http.putRaw(`/${this.context.account}/master/_promote`, payload, {
      headers: {
        Authorization: `Bearer ${this.context.adminUserAuthToken}`,
      },
    })
    return res.status
  }
}
