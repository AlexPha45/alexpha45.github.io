import type { Project } from '../data/portfolio';
import { Icon } from './Icon';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const illustrationCaptions: Record<string, string> = {
  pokerbots: 'Decisions under uncertainty.',
  numerical: 'Approximating the complex.',
  trefoil: 'Finding structure in the knot.',
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card reveal${featured ? ' project-featured' : ''}`}>
      <div className="project-visual">
        <div className="visual-label"><span>PROJECT / {project.number}</span><span>{project.year}</span></div>
        <img src={`/images/${project.id}.svg`} width="800" height="500" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="visual-bottom"><span>{illustrationCaptions[project.id]}</span><Icon name="spark" size={18} /></div>
      </div>
      <div className="project-content">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="tags" aria-label="Project topics">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        {featured && <>
          <div className="project-metrics">
            <div><strong>08</strong><span>strategy iterations</span></div>
            <div><strong>144k+</strong><span>hands in a selected run</span></div>
          </div>
          <p className="feature-context">Boston regional selection · Harvard University</p>
        </>}
        <details className="project-details">
          <summary>Inside the project <span className="details-indicator" aria-hidden="true">+</span></summary>
          <div className="details-content">
            <ul className="detail-list">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            {project.credits && <p className="credits">{project.credits}</p>}
            {project.note && <p className="project-note">{project.note}</p>}
          </div>
        </details>
        <div className="project-links">
          {project.links.map((link, index) => (
            <a key={link.href} className={`resource-link${index === 0 ? ' resource-primary' : ''}`} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}<Icon name="arrow" size={14} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
