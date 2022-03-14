import http from 'http'
import {requestHandler} from './routes';

const server: http.Server = http.createServer((req, res) => {
  requestHandler(req,res)
})

server.listen(3000)
