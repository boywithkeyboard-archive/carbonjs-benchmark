async function bench(runtime, file) {
  const process = runtime === 'node' ? new Deno.Command('node', {
    args: ['servers/' + file]
  }).spawn() : runtime === 'deno' ? new Deno.Command('deno', {
    args: ['run', '-A', 'servers/' + file]
  }).spawn() : new Deno.Command('bun', {
    args: ['run', 'servers/' + file]
  }).spawn()

  let isUp

  while(!isUp) {
    try {
      const res = await fetch('http://127.0.0.1:3000')

      await res.body?.cancel()

      isUp = res.ok
    } catch (err) {}
  }

  const result = new Deno.Command('bombardier', {
    args: ['-n', '100000', '-c', '50', '-p', 'r', '-o', 'pt', 'http://127.0.0.1:3000']
  }).outputSync()

  process.kill()

  return new TextDecoder().decode(result.stdout)
}

let readme = ''

// readme += '**Carbon (Bun)**\n\n```\n' + await bench('bun', 'bun_carbon.js') + '```\n\n'
// readme += '**Bun**\n\n```\n' + await bench('bun', 'bun.js') + '```\n\n'

readme += '**Carbon (Deno)**\n\n```\n' + await bench('deno', 'deno_carbon.js') + '```\n\n'
readme += '**Deno**\n\n```\n' + await bench('deno', 'deno.js') + '```\n\n'

readme += '**Carbon (Node)**\n\n```\n' + await bench('node', 'node_carbon.js') + '```\n\n'
readme += '**Node**\n\n```\n' + await bench('node', 'node.js') + '```\n\n'

Deno.writeTextFileSync('./readme.md', readme)
