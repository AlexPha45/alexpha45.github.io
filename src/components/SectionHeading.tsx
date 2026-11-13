interface SectionHeadingProps {
  number: string;
  label: string;
  id: string;
}

export function SectionHeading({ number, label, id }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <h2 id={id} className="eyebrow"><span>{number}</span><span aria-hidden="true"> / </span>{label}</h2>
    </div>
  );
}

export default SectionHeading;
