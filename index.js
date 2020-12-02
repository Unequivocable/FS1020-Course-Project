import express from 'express'
import entries from './src/entriesRoutes.js'
import users from './src/usersRoutes.js'
import auth from './src/authRoutes.js'
import hasAllProps from './lib/middleware/validateMw'

const app = express()
const PORT = 3000

app.use(express.json())

app.use(hasAllProps)

app.use('/', entries)

app.use('/', users)

app.use('/', auth)

//Error handler

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.status(500).send({error: "An unexpected error has ended this request"})
})

export default app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}.`);
})
