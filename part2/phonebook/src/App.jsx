import { useState } from 'react'

const Person = ({ person }) => <p>{person.name}</p>

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }
    console.log(person)
    setPersons(persons.concat(person))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => 
          <Person key={person.name} person={person} />
        )
      }
    </div>
    <div>debug: {newName}</div>
    </>
  )
}

export default App
