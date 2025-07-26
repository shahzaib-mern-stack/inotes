const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = 'shahzaib123'


const app = express()
app.use(cors())
app.use(express.json())

const PORT = 2000;

async function ProtectedMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.json({message: 'exist'})

     const token = authHeader.split(" ")[1];
     if(!token) return res.json({message: 'token'})
        
      try{

          const decoded =  jwt.verify(token, SECRET)
          
        //   res.json({message: 'pass'})
          next()
        } 
        catch(err){
        res.json({message: 'invalid'})
        } 

}


// async function ProtectedMiddleware(req, res, next) {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(401).json({ message: 'exist404' });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: 'token404' });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     req.user = decoded; // if you want to pass user data to the next route
//     next(); // pass control to next middleware or route
//   } catch (err) {
//     return res.status(403).json({ message: 'token_invalid' });
//   }
// }


app.get('/protected', ProtectedMiddleware, (req, res) => {
    // res.json({message: 'passed200'})
})

mongoose.connect("mongodb://localhost:27017/inote");

const Schema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: String,
    profileImg: String
}, {
    collection: 'users'
})

const User = mongoose.model('usermodel', Schema);


const secondSchama = new mongoose.Schema({
    title: String,
    description: String,
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    collection: 'note',
    timestamps: true 
})

const Note = mongoose.model('usernotes', secondSchama)

app.post('/login', async (req, res) => {
    var {email, password} = req.body;
    
    try{ 
    
        const emailExist = await User.findOne({email})
        if(!emailExist) return res.status(200).json({message: "Email not registered"})
            
            const pass = await bcrypt.compare(password, emailExist.password)  
            if(!pass)  return res.status(200).json({message: 'Invalid Password'})
                
                let token = jwt.sign({ id: emailExist._id }, SECRET, { expiresIn: '365d' });
                res.status(200).json({message: 'login200', 'token' : token, 'userId': emailExist._id})
                
            }
            catch(err){
                console.log(err)
            }
                
            })

app.post('/google/login', async (req, res) => {
    var {name, email, profileImg} = req.body;
    try{ 

    
        const emailExist = await User.findOne({email})
        if(emailExist){
               let token = jwt.sign({id: emailExist._id}, SECRET, {expiresIn: '365d'})     
     
res.status(200).json({message: 'success', 'token' : token, 'userId': emailExist._id, user: 'old'})


        }
        else{
                       let newUser =  new User({name, email, profileImg})
            await newUser.save()


              let findId2 =  await User.findOne({email})
        
    let token = jwt.sign({id: findId2._id}, SECRET, {expiresIn: '365d'})     
     
res.status(200).json({message: 'success', 'token' : token, 'userId': findId2._id, user: 'new'})

        }

      
            
            
                
           
                
            }
            catch(err){
                res.json(err)
            }
                
            })
            
            app.post('/regester', async (req, res) => {
    var {name, email, password} = req.body;
 
    try{

        let findId =  await User.findOne({email})
        if(findId) return res.status(200).json({message: "user already exist"})
            
            let passHash = await bcrypt.hash(password, 10)
            // res.status(200).json({passHash : passHash})
 
            let newUser =   new User({name, email, password: passHash})
            await newUser.save()


        let findId2 =  await User.findOne({email})

       let token = jwt.sign({id: findId2._id}, SECRET, {expiresIn: '1h'})     
        
   res.status(200).json({message: 'regester200', 'token' : token, 'userId': findId2._id})
    
        }
        catch(err){
            console.log(err)
        }
  
})

app.get('/user/:hello', async (req, res) => {
    let userId = req.params.hello;
    
    let result = await User.findById(userId)
    res.json(result)
})

app.post('/add',async (req, res) => {
  

    try{

        let {createdUser} = req.body;
        let title = "";
        let description = "";
        let newData = new Note({title, description, createdUser})
        await newData.save() 

        let result = await Note.find({ createdUser: createdUser })
                       .sort({ createdAt: -1 })  // descending
                       .limit(1);               // only one result
                  
        
        res.json({message: 'added', result: result})
    }
    catch(err){
        res.json(err)
    }
})

app.get("/notes/:userid", async (req, res) => {

    try{

        let userid = req.params.userid;
        
        
        let result = await Note.find({ createdUser: userid, 
            $or: [
        { title: { $nin: [null, ""] } },
        { description: { $nin: [null, ""] } }
      ]

        })
        
        res.json({result: result})
    }
    catch(err){
        res.json(err)
    }
})

app.get('/noteDetail/:noteid', async (req, res) => {
   let note = await Note.findById(req.params.noteid)
   if(!note) return res.status(404)
   res.json({note})

})

app.put('/noteDetail/:noteid', ProtectedMiddleware,async (req, res) => {
    try{
        let {title, description} = req.body;
        let note = await Note.findByIdAndUpdate(
            req.params.noteid,
            {title, description},
            {new: true}
        )
        if(!note) return res.status(404)

        res.json({message: "success", result: note})
    }
    catch(err){
        res.json({err})
    }

})

app.delete('/noteDetail/:noteid', async (req, res) => {
    let response = await Note.findByIdAndDelete(req.params.noteid)
    
    if(response) return res.json({message: 'deleted'})  
      

})

app.listen(PORT, ()=> {
    console.log('port run')
})