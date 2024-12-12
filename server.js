const { OpenAI } = require("openai")
const express =  require('express')

const app = express()


const openai = new OpenAI({
    // replace your-api-key with your API key from ChatGPT
    apiKey: 'my-api-key'
})
app.use(express.json());

app.use(express.static('public'));
app.post('/chat', async (req, res)=> {   
    try {
      const resp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
          messages: [
            { role: "user", content: req.body.question}
          ]  
      })           
  
      res.status(200).json({message: resp.choices[0].message.content})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
  })
app.use(express.static('public'))

app.listen(5000, ()=> {
    console.log("Server is active")
})