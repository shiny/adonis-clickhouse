import app from "@adonisjs/core/services/app";
import { ClickHouseClient, createClient } from "@clickhouse/client";
import { ClickHouseConnectionsList, ClickHouseService } from "adonis-clickhouse/types";

let clickhouse: ClickHouseClient
let manager: ClickHouseService

export class ClickHouseManager<ConnectionsList extends ClickHouseConnectionsList> {
    connect<ConnectionName extends keyof ConnectionsList>(connectionName: ConnectionName) {
        const clickhouse = app.config.get<{connections: ConnectionsList}>('clickhouse')
        return createClient(clickhouse.connections[connectionName])
    }
}

await app.booted(async () => {
    clickhouse = await app.container.make("clickhouse")
    manager = new ClickHouseManager()
})

export { clickhouse as default, manager }
