const express = require('express')
const app = express()

const port = process.env.PORT || 7000


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/music_symbols_question_history',(req,res)=>{
    MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    { useUnifiedTopology: true },

     function (err, db) {
      if (err) throw err;
      var dbo = db.db("violin_tutor");

      dbo.collection('users')
        .findOne(
          { email: 'judaozhong@gmail.com' },
        )
        .then(result =>{
            
        })
    })
})


app.listen(port, () => console.log(`音乐训练APP 正跑在端口： ${port}`))