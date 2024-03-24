Bun.serve({
  port: 3000,
  async fetch() {
    return new Response('Hello World', {
      status: 200,
      headers: {
        'content-type': 'text/plain'
      }
    })
  }
})
