const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('POST Data: ', req)
  res.status(200).json({
    jobRunID: req.body.id,
    data: {
       result: 100.0 // Edit this field to change what the External Adapter reports
    },
    error: null
  })
})

const port = process.env.EA_PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))
