const router = require('express').Router()

const Person = require('../models/Person')

// rotas da API

// usando as rotas dentro do arquivo separado, deve ser importado o router e então usa ele para fazer o post,
// para não ficar redundante pois onde é importado já foi passado que a rota será /person,
// aqui deve ser passado apenas /
router.post('/', async (req, res) => {
  // tratar os dados que vem do body

  // req.body

  const { name, birthDate, salary, approved } = req.body

  if (!name) {
    res.status(422).json({ error: 'You must set a name!' })
    return
  }
  if (!birthDate) {
    res.status(422).json({ error: 'You must set a birtdate!' })
    return
  }
  if (!salary) {
    res.status(422).json({ error: 'You must set a salary!' })
    return
  }
  if (!approved) {
    res.status(422).json({ error: 'You must set if is approved!' })
    return
  }

  const person = {
    name,
    birthDate,
    salary,
    approved,
  }

  try {
    // criando dados
    await Person.create(person)

    res
      .status(201)
      .json({ message: 'Person inserted in the database with success!' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)

    if (!person) {
      return res.status(404).json({ error: 'Person not found!' })
      
    }

    res.status(200).json(person)
  } catch (error) {
    res
      .status(404)
      .json({ error: `The person's ID = ${req.params.id} was not found!` })
  }
})

// Update - atualização de dados (PUT, PATCH) PUT é obrigado trocar todos os dados
// PATCH é possível trocar apenas um dos dados

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findById(id)

    if(!person){
      return res.status(404).json({message: 'Person not found!'})
    }

    if(req.body.name){
      person.name = req.body.name
    }

    if(req.body.birthDate){
      person.birthDate = new Date(req.body.birthDate)
    }

    if(req.body.salary){
      person.salary = req.body.salary
    }

    if(req.body.approved !== undefined){
      person.approved = req.body.approved
    }

    const updatedPerson = await person.save()
    res.status(200).json({ message: 'Person updated successfully!' })

    res.status(200).json(updatedPerson)
  } catch (error) {
    res
      .status(404)
      .json({ error: `The person's ID = ${id} was not found!` })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id)

    if (!person) {
      return res.status(404).json({ error: 'Person not found!' })
    }

    res.status(200).json({ message: 'Person deleted successfully!' })
  } catch (error) {
    res
      .status(404)
      .json({ error: `The person's ID = ${req.params.id} was not found!` })
  }
})

module.exports = router
