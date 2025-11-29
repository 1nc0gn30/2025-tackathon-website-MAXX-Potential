const ApiIdeas = ({ christmasApis }) => {
  return (
    <section className="section api" id="api-ideas">
      <div className="section__header">
        <h2>Free Christmas Data Streams</h2>
        <p className="section__sub">
          Drop-in APIs with no signup to sprinkle live nostalgia data onto your plaza — perfect for 1990s movie trivia or snow
          warnings.
        </p>
      </div>
      <div className="api__grid">
        {christmasApis.map((api) => (
          <article key={api.name} className="api__card">
            <h3>{api.name}</h3>
            <p>{api.description}</p>
            <a className="btn btn-ghost" href={api.url} target="_blank" rel="noreferrer">
              Try sample endpoint
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ApiIdeas
