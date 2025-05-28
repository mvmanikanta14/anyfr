import React, { useEffect, useRef, useState } from "react";
import Register from "./Register";
import Mtm from "./Mtm";
import Fvtpl from "./Fvtpl";
import Fvtcoi from "./Fvtcoi";
import Disclosures from "./Disclosures";
import Forex from "./Forex";
import InvRegister from "../InvRegister";
  
 

const InvestmentsMainview = () => {
    const tabs = [
        { key: "register", label: "Register" },
        { key: "marktomarket", label: "MTM" },
        { key: "fvtpl", label: "FVTPL" },
        { key: "fvtcoi", label: "FVTCOI" },
        { key: "disclosures", label: "Disclosures" },
        { key: "forex", label: "Forex" },
 
       
    ];

    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("Investmentactive") || tabs[0].key;
    });

    const tabRefs = useRef([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        // Save active tab to localStorage when it changes
        localStorage.setItem("Investmentactive", activeTab);

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
                {activeTab === "register" && <InvRegister />}
                {activeTab === "marktomarket" && <Mtm />}
                {activeTab === "fvtpl" && <Fvtpl />}
                {activeTab === "fvtcoi" && <Fvtcoi />}
                {activeTab === "disclosures" && <Disclosures />}
                {activeTab === "forex" && <Forex />}
 
            </div>
        </div>
    );
};

export default InvestmentsMainview;
