export function ServicePreview({ slug }: { slug: string }) {
  if (slug === "ecommerce") {
    return (
      <div className="service-preview service-preview-commerce" aria-hidden="true">
        <div className="service-preview-products"><i /><i /><i /></div>
        <div className="service-preview-lines"><i /><i /></div>
      </div>
    );
  }

  if (slug === "booking-systems") {
    return (
      <div className="service-preview service-preview-booking" aria-hidden="true">
        <div className="service-preview-calendar">
          {Array.from({ length: 14 }, (_, index) => <i className={index === 9 ? "selected" : ""} key={index} />)}
        </div>
        <div className="service-preview-times"><i /><i className="selected" /><i /></div>
      </div>
    );
  }

  if (slug === "custom-web-applications") {
    return (
      <div className="service-preview service-preview-dashboard" aria-hidden="true">
        <div className="service-preview-dashboard-head"><i /><i /></div>
        <div className="service-preview-chart"><i /><i /><i /><i /><i /><i /></div>
        <div className="service-preview-dashboard-rows"><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className={`service-preview service-preview-${slug}`} aria-hidden="true">
      <div className="service-preview-browser"><i /><i /><i /><span /></div>
      <div className="service-preview-content">
        <div><i /><i /><i /></div>
        <div><i /><i /></div>
      </div>
    </div>
  );
}
