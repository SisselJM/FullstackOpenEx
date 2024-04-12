import { useEffect, useState } from 'react'
import personService from './services/persons'
import Person from './components/person'
import './index.css'


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
  const [displayMessage, setDisplayMessage] = useState('')

  useEffect(() => {
    //console.log('effect')
    personService.getAll()
      .then(reponse => {
        //console.log('promise')
        setPersons(reponse)
      })
      .catch(() => {
        alert('Get persons failed!')
      })
}, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.filter((p) => p.name === newName)
    if (existing.length > 0) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      var newPerson = existing[0]
      newPerson.number = newNumber
      //console.log('id: ', newPerson.id)
      personService.update(newPerson.id, newPerson)
        .then((updated) => {
          //console.log('updated: ', updated)
          setPersons(persons.map(p=> p.id !== newPerson.id ? p : updated))
          msg = 'Updated'
        })
        .catch(() => {
          alert('Update failed!')
          return
        })
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      //console.log(person)
      personService.create(person)
        .then((response) => {
          setPersons(persons.concat(response))
        })
        .catch(() => {
          alert('Create failed!')
          return
        })
    }
    var msg = existing.length > 0 ? 'Updated' : 'Created'
    setDisplayMessage(`${msg} ${newName}`)
    setTimeout(() => {
      setDisplayMessage(null)
    }, 5000)
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
    //console.log(id)
    if (!window.confirm(`Do you really want to delete person with id ${id}`)) {
      return
    }
    personService.deletePerson(id)
      .then(() => {
        const index = persons.findIndex(p => p.id === id)
        if (index !== -1) {
          const newPersons = [...persons.slice(0, index), ...persons.slice(index +1)]
          //console.log(newPersons)
          setPersons(newPersons)
          }
      })
      .catch(() => {
        alert('Delete failed!')
      })
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const result = persons.filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
  //console.log('filtered: ', result)

  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <Notification message={displayMessage} />

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
