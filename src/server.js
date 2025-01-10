import express from "express"
import { movieRouter}from "./routes/movie.router.js"

const app=express()
const port = 1289 || 3000

app.use(express.json())

app.use('/', movieRouter);

app.listen(port, () => {
  console.log('Server running on port : http://localhost:'+port);
});