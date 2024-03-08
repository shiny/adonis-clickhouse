<div align="center">
  <img src="https://i.imgur.com/ACueL87.png" />
  <h3>ClickHouse for AdonisJS v6</h3>
  <p>A third-party wrapper for `@clickhouse/client` in AdonisJS v6.</p>
  <a href="https://www.npmjs.com/package/adonis-clickhouse">
    <img src="https://img.shields.io/npm/v/adonis-clickhouse.svg?style=for-the-badge&logo=npm" />
  </a>
  <img src="https://img.shields.io/npm/l/adonis-clickhouse?color=blueviolet&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript" />
</div>

> [!CAUTION]
> This package is not compatible with AdonisJS v5.

<del>Copied a lot from</del> Inspired a lot by [@adonijs/redis](https://github.com/adonisjs/redis/).

## Installation

```bash
npm install --save adonis-clickhouse
node ace configure adonis-clickhouse
```

## Configuration

You can change it in `config/clickhouse.ts`, it's all same with `createClient` Configuration.
here is the details: https://clickhouse.com/docs/en/integrations/language-clients/javascript#configuration

## Environment Variables

- `CLICKHOUSE_DB` Database Name, default `default`
- `CLICKHOUSE_USER` User, default `default`
- `CLICKHOUSE_PASSWORD` Password, default empty string `''`
- `CLICKHOUSE_HOST` Clickhouse connect url, default `http://localhost:8123`
- `CLICKHOUSE_REQUEST_TIMEOUT` The request timeout in milliseconds. Default value: `30000`(30s)
- `CLICKHOUSE_COMPRESSION_REQUEST` Enables compression on the client request body, default `false`
- `CLICKHOUSE_COMPRESSION_RESPONSE` Instructs ClickHouse server to respond with compressed response body. Default value: `true`

## How to import
As it is a container service, you can init it by
```typescript
await app.container.make('clickhouse')
```
or
```typescript
import clickhouse from 'adonis-clickhouse/services/main'
```
The way same as `@adonisjs/redis`.

### Query
The imported clickhouse actully is a instance of `@clickhouse/client` Client, hence those codes are equal:

An example of `adonis-clickhouse`
```typescript
import clickhouse from 'adonis-clickhouse/services/main'
await clickhouse.query({
    /* QueryParams */
})
```

Equaled offical library example
```typescript
import { createClient } from '@clickhouse/client'
const client = createClient({
  /* configuration */
})
await client.query({
    /* QueryParams */
})
```

## Multi Database Instances
You can config the multi databases and use `manager` to connect it.

```typescript
import { manager } from 'adonis-clickhouse/services/main'
// Change main to the name you defined.
const client = manager.connect('main')
await client.query({
    /* QueryParams */
})
```

## Documentation

See [Offical ClickHouse JS Library](https://clickhouse.com/docs/en/integrations/language-clients/javascript)

## Lisence
the MIT
