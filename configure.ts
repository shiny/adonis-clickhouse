import type Configure from '@adonisjs/core/commands/configure'
import pkg from './package.json'
import { stubsRoot } from './stubs/index.js'
const packageName = pkg.name
/**
 * Configures the package
 */
export async function configure(command: Configure) {
    const codemods = await command.createCodemods()
    await codemods.makeUsingStub(stubsRoot, 'config/clickhouse.stub', {})

    /**
     * Add environment variables
     */
    await codemods.defineEnvVariables({
        CLICKHOUSE_HOST: 'http://localhost:8123',
        CLICKHOUSE_USER: 'default',
        CLICKHOUSE_PASSWORD: '',
        CLICKHOUSE_DB: 'default',
        CLICKHOUSE_REQUEST_TIMEOUT: 30000,
        CLICKHOUSE_COMPRESSION_REQUEST: false,
        CLICKHOUSE_COMPRESSION_RESPONSE: true
    })

    /**
     * Validate environment variables
     */
    await codemods.defineEnvValidations({
        variables: {
            CLICKHOUSE_HOST: `Env.schema.string.optional({ format: 'url', tld: false })`,
            CLICKHOUSE_USER: 'Env.schema.string.optional()',
            CLICKHOUSE_PASSWORD: 'Env.schema.string.optional()',
            CLICKHOUSE_DB: 'Env.schema.string.optional()',
            CLICKHOUSE_REQUEST_TIMEOUT: 'Env.schema.number.optional()',
            CLICKHOUSE_COMPRESSION_REQUEST: 'Env.schema.boolean.optional()',
            CLICKHOUSE_COMPRESSION_RESPONSE: 'Env.schema.boolean.optional()',
        },
    })

    /**
     * Register provider
     */
    await codemods.updateRcFile((rcFile) => {
        rcFile.addProvider(`${packageName}/providers/clickhouse_provider`)
    })
}
