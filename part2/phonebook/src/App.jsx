import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Filter = (props) => {
  //console.log(props)
  return (
    <div>Filter shown with <input value={props.value} onChange={props.onChange} /></div>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12345678', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const result = persons.filter(p => p.name.includes(filterValue))
  //console.log('filtered: ', result)

  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={handleFilterChange} />
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        result.map(person => 
          <Person key={person.name} person={person} />
        )
      }
    </div>
    <div>debug: {newName}</div>
    </>
  )
}

export default App
