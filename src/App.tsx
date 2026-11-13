import { profile, projects, experiences, leadership, gallery } from './data/portfolio'
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
      <div className="hero-art">
        <div className="art-topline"><span>FIG. 01 / MAKING CONNECTIONS</span><span className="art-cross" aria-hidden="true">+</span></div>
        <img src="/images/hero-diagram.svg" width="600" height="640" fetchPriority="high" alt="An original mathematical diagram connecting abstract geometry with practical systems." />
        <div className="hero-art-stamp"><Icon name="spark" size={23} /><span>CURIOUS BY NATURE.<br />PRECISE BY PRACTICE.</span></div>
      </div>
    </div>
    <div className="hero-footnote">
      <p><span className="footnote-label">STUDYING</span>Mathematics & Statistics <span className="muted">@ UofT</span></p>
      <p><span className="footnote-label">PREVIOUSLY</span>Data Science <span className="muted">@ TD AI2</span></p>
      <a href="#projects" className="scroll-cue">A FEW THINGS I’VE WORKED ON <Icon name="arrow-down" size={16} /></a>
    </div>
  </section>
}

function Projects() {
  return <section id="projects" className="section site-width" tabIndex={-1} aria-labelledby="projects-heading">
    <SectionHeading number="01" label="Selected work" title={<span id="projects-heading">IDEAS, PUT TO WORK<span className="accent-dot">.</span></span>}>From decisions at the poker table to questions in pure mathematics. A few problems worth getting into.</SectionHeading>
    <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}</div>
    <a className="all-projects text-link" href={profile.github} target="_blank" rel="noreferrer">More on GitHub <Icon size={16} /></a>
  </section>
}

function Experience() {
  return <section id="experience" className="section experience-section" tabIndex={-1} aria-labelledby="experience-heading">
    <div className="site-width">
      <SectionHeading number="02" label="Experience" title={<span id="experience-heading">THE WORK BEHIND THE WORK<span className="accent-dot">.</span></span>}>Building useful tools, making rigorous ideas accessible, and learning from the people around me.</SectionHeading>
      <div className="timeline">{experiences.map((experience, index) => <article key={experience.id} className="experience-row reveal">
        <div className="experience-date"><span className="timeline-square" /><span>{experience.dates}</span><span className="experience-index">/ 0{index + 1}</span></div>
        <div className="experience-content">
          <p className="project-category">{experience.company}</p>
          <h3>{experience.role}</h3>
          <p className="experience-team">{experience.team}</p>
          <p className="experience-summary">{experience.summary}</p>
          {index === 0 && <div className="impact-strip"><div><strong>410<span>+</span></strong><span>internal users</span></div><div><strong>180<span>+</span></strong><span>analysts & scientists trained</span></div><div><strong>Days <span>→</span> hours</strong><span>dashboard deployment workflows</span></div></div>}
          <ul className="detail-list experience-highlights">{experience.highlights.map(item => <li key={item}>{item}</li>)}</ul>
          <ul className="tags">{experience.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </article>)}</div>
      <div className="learning-heading reveal"><h3>ALWAYS A STUDENT.</h3><p>Education & community</p></div>
      <div className="learning-grid">
        <article className="learning-card reveal"><div className="learning-top"><Icon name="book" /><span>2024 — 2028</span></div><h4>Mathematics & Statistics</h4><p className="learning-org">University of Toronto · B.Sc.</p><p>Building a foundation in probability, analysis, algebra, and scientific computing. Expected graduation: 2028.</p></article>
        {leadership.map(item => <article className="learning-card reveal" key={item.title}><div className="learning-top"><Icon name="spark" /><span>{item.date}</span></div><h4>{item.title}</h4><p className="learning-org">{item.organization}</p><p>{item.description}</p></article>)}
      </div>
    </div>
  </section>
}

function Milestones() {
  return <section id="milestones" className="section site-width" tabIndex={-1} aria-labelledby="milestones-heading">
    <SectionHeading number="03" label="Beyond the screen" title={<span id="milestones-heading">BETWEEN THE PANELS<span className="accent-dot">.</span></span>}>The people, places, and shared problems that make the work memorable.</SectionHeading>
    <div className="gallery-context reveal"><span className="status-square" /><p>No Limit Bot Building Tournament</p><span className="muted">Boston regional · Harvard University · 2026</span></div>
    <div className="gallery-grid">{gallery.map(item => <figure key={item.id} className="photo-panel reveal"><div className={`photo-frame photo-${item.id}`}><img src={item.src} srcSet={item.srcSet} sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 959px) calc((100vw - 64px) / 2), 400px" alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" /></div><figcaption><span>{item.caption}</span><span aria-hidden="true">↗</span></figcaption></figure>)}</div>
  </section>
}

function Contact() {
  return <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-heading">
    <div className="site-width contact-grid">
      <div className="contact-copy reveal"><p className="eyebrow"><span>04</span> / Get in touch</p><h2 id="contact-heading">LET’S MAKE<br />SOMETHING<br /><span className="contact-count">COUNT.</span></h2><p>Have a question, a challenging problem, or an idea to explore? I’d be glad to hear from you.</p><span className="contact-location"><span className="status-square" />{profile.location}</span></div>
      <div className="contact-links reveal">
        <a className="contact-card" href={`mailto:${profile.schoolEmail}`}><span className="contact-kind">ACADEMIC & PROFESSIONAL</span><span className="contact-value">{profile.schoolEmail}</span><Icon /></a>
        <a className="contact-card" href={`mailto:${profile.personalEmail}`}><span className="contact-kind">SAY HELLO</span><span className="contact-value">{profile.personalEmail}</span><Icon /></a>
        <div className="social-contact-grid"><a className="social-contact" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /><span>GitHub</span><Icon size={16} /></a><a className="social-contact" href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /><span>LinkedIn</span><Icon size={16} /></a></div>
        <div className="resume-panel"><div><span className="contact-kind">THE SHORT VERSION</span><p>Experience, on paper.</p></div><div className="resume-actions"><a href={profile.resume} target="_blank" rel="noreferrer">View résumé <Icon size={15} /></a><a href={profile.resume} download="Alexandros-Phardis-Resume.pdf" aria-label="Download Alexandros Phardis’s résumé as a PDF"><Icon name="download" size={18} /><span>Download PDF</span></a></div></div>
      </div>
    </div>
  </section>
}

export default function App() {
  const { active, setActive } = useSections()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation active={active} onNavigate={setActive} />
    <main id="main" tabIndex={-1}><Hero /><Projects /><Experience /><Milestones /><Contact /></main>
    <footer className="site-width footer"><a className="wordmark" href="#home" aria-label="Alexandros Phardis, back to top">AP<span>.</span></a><p>© {new Date().getFullYear()} Alexandros Phardis<span>Built with curiosity. And a little ink.</span></p><a className="back-top" href="#home">BACK TO TOP <Icon name="arrow-up" size={16} /></a></footer>
  </>
}
