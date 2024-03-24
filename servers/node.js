import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })

  res.write('Hello World')

  res.end()
})

server.listen(3000, '127.0.0.1')
