const NewBlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleBlogChange,
  handleAuthorChange,
  handleUrlChange
}) => (
  <form onSubmit={handleSubmit}>
    Title: <input value={title} onChange={handleBlogChange} /><br />
    Author: <input value={author} onChange={handleAuthorChange} /><br />
    Url: <input value={url} onChange={handleUrlChange} /><br />
    <button type="submit">save</button>
  </form>  
)

export default NewBlogForm