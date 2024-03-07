
import { NodeClickHouseClientConfigOptions } from '@clickhouse/client/dist/client.js'
export type * from '@clickhouse/client'
import type { ClickHouseManager } from './services/main.js'

export interface ClickHouseConfig {
  connection: keyof ClickHouseConnectionsList;
  connections: ClickHouseConnectionsList;
}

export type ClickHouseConnectionsList = Record<string, NodeClickHouseClientConfigOptions>;
/**
 * it would be extend in user config
 */
export interface Connections {}

export type InferConnections<T extends ClickHouseConfig> = T['connections']
export interface ClickHouseService extends 
  ClickHouseManager<Connections extends ClickHouseConnectionsList ? Connections : never> {}