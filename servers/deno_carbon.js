import { listen } from 'https://esm.sh/@sinclair/carbon@0.8.3/http'

listen({
  hostname: '127.0.0.1',
  port: 3000
}, () => {
  return new Response('Hello World', {
    status: 200,
    headers: {
      'content-type': 'text/plain'
    }
  })
})
