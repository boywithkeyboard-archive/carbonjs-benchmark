Deno.serve({
  port: 3000
}, () => {
  return new Response('Hello World', {
    status: 200,
    headers: {
      'content-type': 'text/plain'
    }
  })
})
