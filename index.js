const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const data = require('./data.js')

app.use(bodyParser.urlencoded({ extended: true }))


  app.route('/').get((req,res) =>{
      res.send("Welcome to our schedule website")
  })
app.route('/users')
  .get((req, res) => {
    res.send(data.users)
  })
  .post((req, res) => {
    var crypto = require('crypto');
    var encrypt = crypto.createHash('sha256').update(req.body.password).digest('base64')
    const user = req.body
    user['password'] = encrypt
    data.users.push(user)
    res.send(data.users)
    
  })
app.route('/schedules')
.get((req,res) =>{
    //console.log(data.schedules)
    res.send(data.schedules)
})
.post((req,res) =>{
    const schedule = req.body
    schedule['day'] = parseInt(schedule.day)
    data.schedules.push(schedule)
    res.send(data.schedules)
})
app.get('/users/:id', (req, res) => {
    let maxUser = data.users.length
    let userId = req.params.id
    let regex = /^[0-9]+$/
    if(regex.test(userId)){
        if(userId > maxUser-1){
            res.send("user id out of range")
        }else{
            res.send(data.users[userId])
        }
    }else{
        res.send("user id does not exist")
    }
})

app.get('/users/:id/schedules', (req, res) => {
    let maxUser = data.users.length
    let userId = req.params.id
    let regex = /^[0-9]+$/
    let respondArr = []
    if(regex.test(userId)){
        if(userId > maxUser-1){
            res.send("user id out of range")
        }else{
            
            data.schedules.forEach( (item) => {
                if(item.user_id == userId){
                    respondArr.push(item)
                }
            });
            res.send(respondArr)
        }
    }else{
        res.send("user id does not exist")
    }
})

app.listen(port,() =>{
    console.log(`Example app listening at http://localhost:${port}`)
})