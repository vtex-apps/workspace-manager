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
        'Authorization': `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjUzRkQ2NjRDQjIwNDRDMEIwMjQyRjM4QjRCRUQ2MTBCQ0JGMTUwNzUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJmYWJyaWNpby52YWdsaWVudGVAdnRleC5jb20uYnIiLCJhY2NvdW50IjoiYWJhcnVmZmFsZGkiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6ImFkM2VhZjIwLTc4OWQtNDZmYi04ZjUwLTM5MTIzMmY1MzQwNyIsImV4cCI6MTYyODE3MzU0NSwidXNlcklkIjoiMjQyODBiYWYtNWFkMS00NzMxLWJjMmMtMGMzZWJhMWU2M2JkIiwiaWF0IjoxNjI4MDg3MTQ1LCJpc3MiOiJ0b2tlbi1lbWl0dGVyIiwianRpIjoiYWM5YjIzNjAtODJmMy00MGM4LTg2MDUtMDdhZWJmN2NkNTUzIn0.-uIYjhjT0AM9Ss0tk4V7GvOkhKxUXb3piiQkEODyc4_QoNzEaP_tKxJ1UY-CRCUCKimTRrMcwADTne66FPW5EA`,
      },
    })
    return res.data
  }

  public async deleteOne(name : String | String[]) {
    const res = await this.http.delete( `/${this.context.account}/${name}`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjUzRkQ2NjRDQjIwNDRDMEIwMjQyRjM4QjRCRUQ2MTBCQ0JGMTUwNzUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJmYWJyaWNpby52YWdsaWVudGVAdnRleC5jb20uYnIiLCJhY2NvdW50IjoiYWJhcnVmZmFsZGkiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6ImFkM2VhZjIwLTc4OWQtNDZmYi04ZjUwLTM5MTIzMmY1MzQwNyIsImV4cCI6MTYyODE3MzU0NSwidXNlcklkIjoiMjQyODBiYWYtNWFkMS00NzMxLWJjMmMtMGMzZWJhMWU2M2JkIiwiaWF0IjoxNjI4MDg3MTQ1LCJpc3MiOiJ0b2tlbi1lbWl0dGVyIiwianRpIjoiYWM5YjIzNjAtODJmMy00MGM4LTg2MDUtMDdhZWJmN2NkNTUzIn0.-uIYjhjT0AM9Ss0tk4V7GvOkhKxUXb3piiQkEODyc4_QoNzEaP_tKxJ1UY-CRCUCKimTRrMcwADTne66FPW5EA`,
      },
    })
    return res
  }
}
