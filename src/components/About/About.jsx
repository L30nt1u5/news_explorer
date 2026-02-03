import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about__avatar" aria-hidden="true" />
      <div className="about__content">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">
          This block describes the author of the project. It contains a short bio and
          links to social networks or portfolio projects.
        </p>
      </div>
    </section>
  )
}

export default About
