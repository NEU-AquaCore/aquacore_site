export default function PageHeader({ eyebrow, title, description, image, children }) {
  return (
    <section className={`aqua-page-header ${image ? 'aqua-page-header-photo' : ''}`}>
      {image && <img className="aqua-page-header-image" src={image} alt="" fetchPriority="high" decoding="async" />}
      <div className="aqua-container aqua-page-header-content"><p className="aqua-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="aqua-page-description">{description}</p>{children}</div>
    </section>
  );
}
