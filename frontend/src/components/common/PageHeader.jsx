import { ChevronRight, Plus } from "lucide-react";

function PageHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="page-heading">
      <div>
        <div className="breadcrumb">
          Meezan <ChevronRight size={13} /> {title}
        </div>

        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button className="primary-button" onClick={onAction}>
          <Plus size={17} />
          {action}
        </button>
      )}
    </div>
  );
}

export default PageHeader;