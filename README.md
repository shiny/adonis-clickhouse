# ClickHouse for AdonisJS v6

> [!CAUTION]
> This package is not compatible with AdonisJS v5.

A third-party wrapper for `@clickhouse/client` in AdonisJS v6.

<del>Copied a lot from</del> Inspired a lot by [@adonijs/redis](https://github.com/adonisjs/redis/).

## Installation

```bash
npm install --save adonis-clickhouse
node ace configure adonis-clickhouse
```

## Configuration

You can change it in `config/clickhouse.ts`, it's all same with `createClient` Configuration.
here is the details: https://clickhouse.com/docs/en/integrations/language-clients/javascript#configuration

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
