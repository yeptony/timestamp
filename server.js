var express = require('express')
var moment = require('moment')
moment().format()
var app = express()

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/:date', function (req, res) {
  var arg = req.params.date
  var dateFormat = "MMMM D, YYYY"
  var unixFormat = "X"

  //check if unix timestamp
  var unix = moment(arg, unixFormat, true).isValid() ? true : false
  //check if natural language date
  var date = moment(arg, dateFormat, true).isValid() ? true : false

  if(unix) {
    var result = constructResponse(arg, moment(parseInt(arg)*1000).format(dateFormat))
  } else if(date) {
    var result = constructResponse(moment(arg).format(unixFormat), arg)
  } else {
    var result = constructResponse(null, null)
  }

  res.end(result)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App running!')
})

function constructResponse(unix, date) {
  return '{ "unix": ' + unix + ', "natural": "' + date + '" }'
}
