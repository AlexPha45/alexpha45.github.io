import { profile, projects, experiences, leadership } from './data/portfolio'
import { Navigation } from './components/Navigation'
import { SectionHeading } from './components/SectionHeading'
import { ProjectCard } from './components/ProjectCard'
import { Icon } from './components/Icon'
import { useSections } from './hooks/useSections'

function Hero() {
  return <section id="home" className="hero site-width" tabIndex={-1} aria-labelledby="hero-heading">
    <div className="hero-main">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="status-square" /> MATHEMATICS. DATA. CODE.</p>
        <h1 id="hero-heading">ALEXANDROS<br /><span>PHARDIS<span className="accent-dot">.</span></span></h1>
        <p className="hero-lead">Mathematical thinking.<br /><strong>Real-world systems.</strong></p>
        <p className="hero-description">I’m a Mathematics & Statistics student at the University of Toronto, turning abstract ideas into useful models, thoughtful software, and better questions.</p>
        <div className="hero-actions flex flex-wrap items-center gap-5">
          <a className="button button-primary" href="#projects">Explore projects <Icon name="arrow-down" size={18} /></a>
          <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">View résumé <Icon size={16} /></a>
        </div>
        <div className="hero-socials flex items-center gap-6">
          <a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" size={17} /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={17} /> LinkedIn</a>
          <a href={`mailto:${profile.schoolEmail}`}><Icon name="mail" size={18} /> Email</a>
        </div>
      </div>
    </div>
    <div className="hero-footnote">
      <p><span className="footnote-label">STUDYING</span>Mathematics & Statistics <span className="muted">@ UofT</span></p>
      <p><span className="footnote-label">PREVIOUSLY</span>Data Science <span className="muted">@ TD</span></p>
      <a href="#projects" className="scroll-cue">A FEW THINGS I’VE WORKED ON <Icon name="arrow-down" size={16} /></a>
    </div>
  </section>
}

function Projects() {
  return <section id="projects" className="section site-width" tabIndex={-1} aria-labelledby="projects-heading">
    <SectionHeading number="01" label="Selected work" id="projects-heading" />
    <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}</div>
    <a className="all-projects text-link" href={profile.github} target="_blank" rel="noreferrer">More on GitHub <Icon size={16} /></a>
  </section>
}

function Experience() {
  return <section id="experience" className="section experience-section" tabIndex={-1} aria-labelledby="experience-heading">
    <div className="site-width">
      <SectionHeading number="02" label="Experience" id="experience-heading" />
      <div className="timeline">{experiences.map((experience, index) => <article key={experience.id} className="experience-row reveal">
        <div className="experience-date"><span className="timeline-square" /><span>{experience.dates}</span><span className="experience-index">/ 0{index + 1}</span></div>
        <div className="experience-content">
          <div className="experience-organization">{experience.id === 'td' && <img className="organization-logo td-logo" src="/images/td-logo.svg" alt="TD Bank Group" />}<p className="project-category">{experience.company}</p></div>
          <h3>{experience.role}</h3>
          <p className="experience-team">{experience.team}</p>
          {experience.id === 'teaching' && <a className="camp-link text-link" href="https://www.mathematics.utoronto.ca/outreach/current-programs/grades-9-12-programs/canada-math-camp" target="_blank" rel="noopener noreferrer">About Canada Math Camp <Icon size={15} /></a>}
          <p className="experience-summary">{experience.summary}</p>
          {index === 0 && <div className="impact-strip"><div><strong>410<span>+</span></strong><span>internal users</span></div><div><strong>180<span>+</span></strong><span>analysts & scientists trained</span></div><div><strong>Days <span>→</span> hours</strong><span>dashboard deployment workflows</span></div></div>}
          <ul className="detail-list experience-highlights">{experience.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          <ul className="tags">{experience.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </article>)}</div>
      <div className="learning-heading reveal"><h3>EDUCATION & COMMUNITY</h3></div>
      <div className="learning-grid">
        <article className="learning-card reveal"><div className="learning-top"><div className="education-logos"><img className="organization-logo" src="/images/utoronto.webp" alt="University of Toronto" /><img className="organization-logo" src="/images/victoria-college.svg" alt="Victoria College" /></div><span>2024 — 2028</span></div><h4>Mathematics & Statistics</h4><p className="learning-org">University of Toronto · B.Sc.<br />Member of Victoria College</p><p>Building a foundation in probability, analysis, algebra, and scientific computing. Expected graduation: 2028.</p></article>
        {leadership.map(item => <article className="learning-card reveal" key={item.title}><div className="learning-top"><Icon name="spark" /><span>{item.date}</span></div><h4>{item.title}</h4><p className="learning-org">{item.organization}</p><p>{item.description}</p></article>)}
      </div>
    </div>
  </section>
}

function Contact() {
  return <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-heading">
    <div className="site-width contact-grid">
      <div className="contact-copy reveal"><p className="eyebrow"><span>03</span> / Contact</p><h2 id="contact-heading">GET IN<br /><span className="contact-count">TOUCH.</span></h2><span className="contact-location"><span className="status-square" />{profile.location}</span></div>
      <div className="contact-links reveal">
        <a className="contact-card" href={`mailto:${profile.schoolEmail}`}><span className="contact-kind">EMAIL</span><span className="contact-value">{profile.schoolEmail}</span><Icon /></a>
        <div className="social-contact-grid"><a className="social-contact" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /><span>GitHub</span><Icon size={16} /></a><a className="social-contact" href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /><span>LinkedIn</span><Icon size={16} /></a></div>
      </div>
    </div>
  </section>
}

export default function App() {
  const { active, setActive } = useSections()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation active={active} onNavigate={setActive} />
    <main id="main" tabIndex={-1}><Hero /><Projects /><Experience /><Contact /></main>
    <footer className="site-width footer"><a className="wordmark" href="#home" aria-label="Alexandros Phardis, back to top">AP<span>.</span></a><p>© {new Date().getFullYear()} Alexandros Phardis</p><a className="back-top" href="#home">BACK TO TOP <Icon name="arrow-up" size={16} /></a></footer>
  </>
}
