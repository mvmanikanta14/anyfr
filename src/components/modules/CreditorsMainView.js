import React, { useEffect, useRef, useState } from "react";
import CoaGroupsView from "../map/CoaGroupsView";
import OthersMap from "../map/OthersMap";
import ArapApTranInvoices from "./ArapApTranInvoices";
import ArapArTranInvoices from "./ArapArTranInvoices";
import ArapAdvpTranInvoices from "./ArapAdvpTranInvoices";
import ArapAdvrTranInvoices from "./ArapAdvrTranInvoices";
import ArapTranSettlement from "./ArapTranSettlement";

const CreditorsMainView = () => {
    const tabs = [
        { key: "payable", label: "Account Payable" },
        { key: "acc_receivable", label: "Account Receivable" },
        { key: "adv_receivable", label: "Advance Receivable" },
        { key: "adv_payable", label: "Advance Payable" },
        { key: "settlement", label: "Settlement" },
    ];

    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("creditorsactive") || tabs[0].key;
    });

    const tabRefs = useRef([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        // Save active tab to localStorage when it changes
        localStorage.setItem("creditorsactive", activeTab);

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
                {activeTab === "payable" && <ArapApTranInvoices />}
                {activeTab === "acc_receivable" && <ArapArTranInvoices />}
                {activeTab === "adv_receivable" && <ArapAdvrTranInvoices />}
                {activeTab === "adv_payable" && <ArapAdvpTranInvoices />}
                {activeTab === "settlement" && <ArapTranSettlement />}
            </div>
        </div>
    );
};

export default CreditorsMainView;
