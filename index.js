//Configuração Inicial
const express = require('express') // Importa o EXPRESS
const { default: mongoose } = require('mongoose')
const app = express() // Inicializa o EXPRESS como função na const APP
require('dotenv').config()

//Configuração de ler JSON


// urlencoded é um middlewrare pra decodificar os dados enviados através do corpo da requisição, o parametro TRUE serve para permitir o uso de objetos e matrizes como valores do parametro

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//Rota inicial / endpoint

app.get('/', (req, res) =>{

    // mostrar requisição
    res.json({message:'Testando express'})
})

// MongoDB ATLAS

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


//Entregar uma porta para rodar o projeto
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.5e1le5z.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Successfull conection with MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))



