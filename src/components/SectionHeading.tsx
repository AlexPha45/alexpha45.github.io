import type { ReactNode } from 'react';

interface SectionHeadingProps {
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}

export function SectionHeading({ number, label, title, children }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow"><span>{number}</span><span aria-hidden="true"> / </span>{label}</p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

export default SectionHeading;
