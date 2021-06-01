const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const data = require('./data.js')
const db = require('./database')

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// index page
  app.route('/').get((req,res) =>{
    //res.render('pages/index')
    console.log("AAAAAAAAAAAAAAAA")
    db.any('select * from schedules;')
    .then((schedules) => {
        res.render('pages/index')
    })
    .catch((err) => {
        res.send(err)
    })
   
  })
//schedule from/to DB
  app.route('/new').get((req,res) =>{
    res.render('pages/index')
  })
// users get and post   
app.route('/users')
  .get((req, res) => {
    //res.send(data.users)
    res.render('pages/users',{
        users: data.users
    })
  })
  .post((req, res) => {
      console.log("success!!")
    var crypto = require('crypto');
    var encrypt = crypto.createHash('sha256').update(req.body.password).digest('base64')
    const user = req.body
    user['password'] = encrypt
    data.users.push(user)
    res.redirect('/users')
    
  })
 // schedules get and post  
app.route('/schedules')
.get((req,res) =>{
    res.render('pages/schedules',{
        schedules: data.schedules
    })
})
.post((req,res) =>{
    const schedule = req.body
    schedule['day'] = parseInt(schedule.day)
    data.schedules.push(schedule)
    res.redirect('/schedules')

})
//add new user 
app.route('/users/new')
  .get((req, res) => {
    //res.send(data.users)
    res.render('pages/newUser',{
       
    })
  })
//add new schedule
app.route('/schedules/new')
  .get((req, res) => {
    //res.send(data.users)
    res.render('pages/newSchedule',{
        users: data.users
    })
  })  
// get for specific user 
app.get('/users/:id', (req, res) => {
    let maxUser = data.users.length
    let userId = req.params.id
    let regex = /^[0-9]+$/
    if(regex.test(userId)){
        if(userId > maxUser-1){
            res.send("user id out of range")
        }else{
            //res.send(data.users[userId])
            
            res.render('pages/user',{
                user: data.users[userId]
            })
        }
    }else{
        res.send("user id does not exist")
    }
})
// show shcedule for specific user 
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
            //res.send(respondArr)
            res.render('pages/schedules',{
                schedules: respondArr
            })
        }
    }else{
        res.send("user id does not exist")
    }
})



app.listen(port,() =>{
    console.log(`listening at http://localhost:${port}`)
})