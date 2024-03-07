import { RuntimeException } from "@poppinss/utils";
import type { ClickHouseConnectionsList } from './types.js'

export function defineConfig<T extends ClickHouseConnectionsList>(
  config: {
    connection: keyof T,
    connections: T
  }
): {
  connection: keyof T,
  connections: T
} {
  if (!config) {
    throw new RuntimeException("Invalid config. It must be an object");
  }

  if (!config.connections) {
    throw new RuntimeException(
      'Missing "connections" property in the clickhouse config file'
    );
  }

  if (!config.connection) {
    throw new RuntimeException(
      'Missing "connection" property in clickhouse config. Specify a default connection to use'
    );
  }

  if (!config.connections[config.connection]) {
    throw new RuntimeException(
      `Missing "connections.${String(
        config.connection
      )}". It is referenced by the "default" clickhouse connection`
    );
  }
  return config;
}
