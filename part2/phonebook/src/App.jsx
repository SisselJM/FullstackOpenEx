import { useEffect, useState } from 'react'
import personService from './services/persons'
import Person from './components/person'


const Filter = (props) => {
  //console.log(props)
  return (
    <div>Filter shown with <input value={props.value} onChange={props.onChange} /></div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
        <div>
          name: <input value={props.newName} onChange={props.onNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.onNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={props.onSubmit}>add</button>
        </div>
      </form>    
  )
}

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    //console.log('effect')
    personService.getAll()
      .then(reponse => {
        //console.log('promise')
        setPersons(reponse)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.filter((p) => p.name === newName)
    if (existing.length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }
    //console.log(person)
    personService.create(person)
      .then(
        setPersons(persons.concat(person))
      )
      setNewName('')
      setNewNumber('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    console.log(id)
    //deletePerson
    //setPersons(persons.map)
  }

  const result = persons.filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
  //console.log('filtered: ', result)

  return (
    <>
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterValue} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} onNameChange={handleNameChange} 
        newNumber={newNumber} onNumberChange={handleNumberChange} 
        onSubmit={addPerson} 
      />

      <h3>Numbers</h3>
      {
        persons.map(person => 
          <Person person={person} onDeleteEvent={() => handleDelete(person.id)} key={person.id} />
        )
      }
    </div>
    <div>debug: {newName}</div>
    </>
  )
}

export default App
