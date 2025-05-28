const dashboard_sidebar = {
  success: true,
  menu: [
    { label: "Dashboard", icon: "home", route: "/dashboard" },
    { label: "Create Financials", icon: "plus-square", route: "/create" },
    { label: "Master Data", icon: "database", route: "/masters" },
    { label: "MIS Reports", icon: "bar-chart", route: "/mis" },
    { label: "Invoicing", icon: "file-invoice", route: "/invoices" },
    { label: "Settings", icon: "cog", route: "/settings" }
  ]
};

const dashboard_calendar = {
  success: true,
  highlighted_dates: [
    { date: "2025-04-05", label: "BRS Due" },
    { date: "2025-04-10", label: "Audit Review" },
    { date: "2025-04-18", label: "Filing Deadline" }
  ]
};

const dashboard_announcements = {
  success: true,
  announcements: [
    { id: 1, title: "New Tax Update", date: "2025-03-28", message: "Please review GST changes effective April 1." },
    { id: 2, title: "Downtime Notice", date: "2025-04-02", message: "System will be down from 2 AM to 5 AM." }
  ]
};

const dashboard_in_tray = {
  success: true,
  tasks: [
    { id: "task-101", title: "Upload Trial Balance", due_date: "2025-04-05", type: "data-entry" }
  ]
};

const dashboard_current_tray = {
  success: true,
  tasks: [
    { id: "task-102", title: "BRS Preparation", status: "In Progress", started_on: "2025-03-30" }
  ]
};

const dashboard_out_tray = {
  success: true,
  tasks: [
    { id: "task-103", title: "Finalized Financials - March 2025", completed_on: "2025-03-30" }
  ]
};

const dashboard_metrics = {
  success: true,
  metrics: {
    clients_added: 4,
    open_tasks: 7,
    completed_reports: 12,
    invoices_raised: 3
  }
};

const common_error = {
  success: false,
  error: "Unauthorized access or internal error"
};

module.exports = {
  dashboard_sidebar,
  dashboard_calendar,
  dashboard_announcements,
  dashboard_in_tray,
  dashboard_current_tray,
  dashboard_out_tray,
  dashboard_metrics,
  common_error
};
