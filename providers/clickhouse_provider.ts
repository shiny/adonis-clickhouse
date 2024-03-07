import { ApplicationService } from '@adonisjs/core/types'
import { createClient, type ClickHouseClient } from '@clickhouse/client'
import { ClickHouseConfig } from '../types.js'

declare module '@adonisjs/core/types' {
    interface ContainerBindings {
      clickhouse: ClickHouseClient
    }
}
  
export default class ClickHouseProvider {
    constructor(protected app: ApplicationService) {
    }

    register() {
        this.app.container.singleton('clickhouse', async () => {
            const config = this.app.config.get<ClickHouseConfig>('clickhouse')
            if (config.connections[config.connection]) {
                return createClient(config.connections[config.connection])
            } else {
                throw new Error('ClickHouse Config Malformed')
            }
        })
    }

    async shutdown() {
        const clickhouse = await this.app.container.make('clickhouse')
        await clickhouse.close()
    }
}
