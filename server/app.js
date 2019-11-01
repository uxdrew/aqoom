const express = require('express')
const helper = require('./helper.js')
const app = express()
const port = 8080

app.use(express.static('public'))

app.get('/hello', (req, res) => res.send('Hello World!'))
app.get('/getreceiptinfo', (req, res) => helper.GetReceiptInfo(res));
app.get('/submitreceipt', (req, res) => helper.SubmitReceipt(res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))