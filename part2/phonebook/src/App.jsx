import { useEffect, useState } from 'react'
import axios from 'axios'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

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

const Persons = ({persons}) => {
  return (
      persons.map(person => 
        <Person key={person.name} person={person} />
      )
  )
}

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(reponse => {
        //console.log('promise')
        setPersons(reponse.data)
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
    setPersons(persons.concat(person))
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
      <Persons persons={result} />
    </div>
    <div>debug: {newName}</div>
    </>
  )
}

export default App
