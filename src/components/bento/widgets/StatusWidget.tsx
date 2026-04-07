const StatusWidget = () => {
  return (
    <div className="status-widget">
      <div className="status-widget__indicator">
        <span className="status-widget__dot" aria-hidden="true" />
        <span className="status-widget__text">Open to work</span>
      </div>
      <p className="status-widget__detail">
        Disponible pour des missions freelance ou un poste en CDI.
      </p>
    </div>
  );
};

export default StatusWidget;
