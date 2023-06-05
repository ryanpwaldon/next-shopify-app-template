import { env } from './src/env.mjs'
import ngrok from '@ngrok/ngrok'

let makeTunnel = true
let host = 'localhost'
let port = process.env.PORT || '3000'

process.argv.forEach((item, index) => {
  // The first process to configure is a child which runs building, then the parent
  // configures later, so use arguments rather than environment variable to run once.
  if (item.includes('processChild')) makeTunnel = false

  if (['--hostname', '-H'].includes(item)) {
    const value = process.argv[index + 1]
    if (typeof value === 'string') {
      host = value
    }
  }

  if (['--port', '-p'].includes(item)) {
    const value = process.argv[index + 1]
    if (typeof value === 'string') {
      port = value
    }
  }
})

async function setup() {
  const authToken = env.NGROK_TOKEN
  const tunnelHost = env.NGROK_HOST
  if (!authToken) throw new Error('NGROK_TOKEN is not set.')
  if (!tunnelHost) throw new Error('NGROK_HOST is not set.')
  const session = await new ngrok.NgrokSessionBuilder().authtoken(authToken).connect()
  const tunnel = await session.httpEndpoint().domain(tunnelHost).listen()
  console.log(`Forwarding to: ${host}:${port} from ingress at: ${tunnel.url()}`)
  tunnel.forwardTcp(`${host}:${port}`)
}

if (makeTunnel) setup()
