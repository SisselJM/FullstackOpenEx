const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      <strong>{message}</strong>
    </div>
  )
}

export default Notification