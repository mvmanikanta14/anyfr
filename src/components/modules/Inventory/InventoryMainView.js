import React, { useEffect, useRef, useState } from "react";
import ArapApTranInvoices from "../ArapApTranInvoices";
import Movements from "./Movements";
import Process from "./Process";
import ClosingStock from "./ClosingStock";
import Forex from "./Forex";
  
 

const InventoryMainView = () => {
    const tabs = [
        { key: "movement", label: "Movement" },
        { key: "process", label: "Process & Yield" },
        { key: "closing", label: "Inventory Closing Stock" },
        { key: "forex", label: "Forex" },
       
    ];

    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("inventoryactive") || tabs[0].key;
    });

    const tabRefs = useRef([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        // Save active tab to localStorage when it changes
        localStorage.setItem("inventoryactive", activeTab);

        const index = tabs.findIndex((t) => t.key === activeTab);
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
                {activeTab === "movement" && <Movements />}
                {activeTab === "process" && <Process />}
                {activeTab === "closing" && <ClosingStock />}
                {activeTab === "forex" && <Forex />}
 
            </div>
        </div>
    );
};

export default InventoryMainView;
