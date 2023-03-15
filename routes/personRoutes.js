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
  }
  if (!birthDate) {
    res.status(422).json({ error: 'You must set a birtdate!' })
  }
  if (!salary) {
    res.status(422).json({ error: 'You must set a salary!' })
  }
  if (!approved) {
    res.status(422).json({ error: 'You must set if is approved!' })
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
    res.status(404).json({ error: `The person's id ${req.params.id} was not found!` })
  }
})

module.exports = router
