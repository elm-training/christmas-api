var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment')

var app = express()

app.use(bodyParser.text({type: '*/*'}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/is-it-christmas', function(req, res) {
  var now = moment()

  var christmas = moment().set({month: 'December', date: 25, hour: 0, minute: 0, second: 0})

  if (now.month() === 11 && now.date() === 25) {
    return res.send('YES')
  } else {
    var difference = christmas.diff(now, 'seconds')
    return res.send('NO, ' + difference + ' seconds until Christmas.')
  }
})

var people = []
app.get('/cool-people', function(req, res) {
  res.send(people)
})

app.post('/cool-people', function(req, res) {
  if (!req.body) {
    return res.sendStatus(422)
  }

  people.push(req.body)
  return res.send(people)
})

app.delete('/cool-people', function(req, res) {
  people = []
  res.send(people)
})

app.listen(2525)
