import * as TablerIcons from "@tabler/icons-react";

const CentralizedWidget = ({ icon, title, count, bgColor, iconColor }) => {
  // Define a mapping between FontAwesome class names and Tabler Icons
  const iconMap = {
    "fa-users": "IconUsers",
    "fa-home": "IconHome",
    "fa-chart-bar": "IconChartBar",
    "fa-cog": "IconSettings",
    "fa-user": "IconUser",
    // Add more mappings as needed
  };

  // Get the corresponding Tabler Icon component
  const TablerIcon = TablerIcons[iconMap[icon]] || TablerIcons.IconCircleX; // Fallback icon

  return (
    <div className="widget-container" style={{ backgroundColor: bgColor, color: "#fff", padding: "20px", borderRadius: "8px", display: "flex", alignItems: "center" }}>
      <div className="widget-icon" style={{ backgroundColor: iconColor, padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TablerIcon size={24} stroke={1.5} />
      </div>
      <div className="widget-info" style={{ marginLeft: "10px" }}>
        <h5>{title}</h5>
        <h3>{count}</h3>
      </div>
    </div>
  );
};

export default CentralizedWidget;
