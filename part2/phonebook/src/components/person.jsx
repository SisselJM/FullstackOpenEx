const Person = ({ person, onDeleteEvent }) => {
    return (
    <p>
      {person.name} {person.number} <button onClick={onDeleteEvent}>Delete</button>
    </p>
    )
  }

  export default Person