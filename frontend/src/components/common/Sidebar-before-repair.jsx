
import {
  BookOpen,
  X,
  Building2,
  ChevronDown,
  BrainCircuit,
  Sparkles,
  LogOut,
} from "lucide-react";

import { navigation } from "../../utils/navigation";

function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-mark">
            <BookOpen size={25} />
          </div>

          {!collapsed && (
            <div className="brand-copy">
              <strong>Meezan</strong>
              <span>ERP MANAGEMENT</span>
            </div>
          )}

          <button
            className="icon-button sidebar-close"
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-avatar">
            <Building2 size={18} />
          </div>

          {!collapsed && (
            <div className="workspace-copy">
              <strong>My Business</strong>
              <span>Default workspace</span>
            </div>
          )}

          {!collapsed && <ChevronDown size={16} />}
        </div>

        <nav className="sidebar-nav">
          {navigation.map((group) => (
            <div className="nav-group" key={group.title}>
              {!collapsed && (
                <p className="nav-heading">{group.title}</p>
              )}

              {group.items.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  title={collapsed ? label : undefined}
                  className={`nav-link ${
                    activePage === label ? "nav-link-active" : ""
                  }`}
                  onClick={() => {
                    setActivePage(label);
                    setMobileOpen(false);
                  }}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  {!collapsed && <span>{label}</span>}

                  {!collapsed && label === "Stock Overview" && (
                    <span className="nav-count">3</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`nav-link ai-nav-link ${
              activePage === "AI Business Assistant"
                ? "nav-link-active"
                : ""
            }`}
            onClick={() => {
              setActivePage("AI Business Assistant");
              setMobileOpen(false);
            }}
            title={collapsed ? "AI Business Assistant" : undefined}
          >
            <BrainCircuit size={19} />

            {!collapsed && (
              <>
                <span>AI Business Assistant</span>
                <Sparkles size={15} />
              </>
            )}
          </button>

          <div className="sidebar-profile">
            <div className="profile-avatar">TA</div>

            {!collapsed && (
              <div className="profile-copy">
                <strong>Administrator</strong>
                <span>Admin account</span>
              </div>
            )}

            {!collapsed && (
              <button
                className="icon-button"
                title="Log out"
                onClick={() =>
                  alert(
                    "Login and logout will be connected to authentication later."
                  )
                }
              >
                <LogOut size={17} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

