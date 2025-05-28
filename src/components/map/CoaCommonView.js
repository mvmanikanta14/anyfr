import React, { useEffect, useRef, useState } from "react";
import CoaFssView from "./CoaFssView";
import CoaGLView from "./CoaGLView";
import CoaGroupsView from "./CoaGroupsView";
import OthersMap from "./OthersMap";

const CoaCommonView = () => {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("coaActiveTab") || "fss";
    });
    
    const tabRefs = useRef([]);
    const sliderRef = useRef(null);

    const tabs = [
        { key: "gl", label: "GL View" },
        { key: "groups", label: "Groups View" },
        { key: "fss", label: "FSS View" },
    ];

    useEffect(() => {

        localStorage.setItem("coaActiveTab", activeTab);

        
        const index = tabs.findIndex(t => t.key === activeTab);
        const tabEl = tabRefs.current[index];
        if (tabEl && sliderRef.current) {
            const { offsetLeft, offsetWidth } = tabEl;
            sliderRef.current.style.left = `${offsetLeft}px`;
            sliderRef.current.style.width = `${offsetWidth}px`;
        }
    }, [activeTab]);

    return (
        <div>
            <div className="customs-tabs">
                <div className="slider-pill" ref={sliderRef}></div>

                {tabs.map((tab, i) => (
                    <button
                        key={tab.key}
                        ref={(el) => (tabRefs.current[i] = el)}
                        className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content px-1 pt-2">
                {activeTab === "fss" && <CoaFssView />}
                {activeTab === "gl" && <OthersMap />}
                {activeTab === "groups" && <CoaGroupsView />}
            </div>
        </div>
    );
};

export default CoaCommonView;
