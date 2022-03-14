import fs from 'fs'
import { IncomingMessage, ServerResponse } from 'http'

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url: string | undefined = req.url
  const method: string | undefined = req.method

  if (url === '/') {
    res.setHeader('Content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My first html from node.js</title></head>')
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>'
    )
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    const body: Uint8Array[] = []
    req.on('data', (chunk: Uint8Array) => {
      body.push(chunk)
    })
    return req.on('end', () => {
      const parseBody: string = Buffer.concat(body).toString()
      const message: string = parseBody.split('=')[1]
      fs.writeFile('message.txt', message, (error) => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }
  res.setHeader('Content-type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My first html from node.js</title></head>')
  res.write('<body><h1>Hello from Node.JS</h1></body>')
  res.write('</html>')
  res.end()
}
