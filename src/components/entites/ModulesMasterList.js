import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import { ApiContext } from "../../services/ApiProvider";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";

const ModulesMasterList = ({ selectedEntityId }) => {
    const [Entities, setEntities] = useState([]);
    const [Moduleslist, setModuleslist] = useState([]);
    const [moduleCheckboxes, setModuleCheckboxes] = useState({});
    const { auth } = useContext(ApiContext);

    useEffect(() => {
        getAllEntities();
        if (selectedEntityId) {
            getAllModuleslist(selectedEntityId);
        }
    }, [selectedEntityId]);

    useEffect(() => {
        if (!Entities.length) return;

        const savedModuleIds = Moduleslist.map(m => m.module_id);
        const updatedCheckboxes = {};

        Entities.forEach(mod => {
            updatedCheckboxes[mod.id] = {
                checked: savedModuleIds.includes(mod.id),
                saving: false,
            };
        });

        setModuleCheckboxes(updatedCheckboxes);
    }, [Moduleslist, Entities]);

    const getAllEntities = () => {
        commonService
            .getAll(apiUrlsService.getAllMasterModules)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setEntities(response.data);
                }
            })
            .catch((error) => {
                console.error("Error loading modules:", error);
            });
    };

    const getAllModuleslist = (entityId) => {
        const requestData = { entity_id: entityId };

        commonService.add(apiUrlsService.getAllModuleslist, requestData)
            .then(res => {
                setModuleslist(res.data.modules.data); // must include module_id
            })
            .catch((error) => {
                console.error("Error loading active modules:", error);
            });
    };

    const handleCheckboxChange = async (mod, isChecked) => {
        const current = moduleCheckboxes[mod.id];
        if (current?.saving) return;

        setModuleCheckboxes(prev => ({
            ...prev,
            [mod.id]: { ...current, saving: true }
        }));

        if (isChecked) {
            // ✅ Save module
            const requestData = {
                entity_id: selectedEntityId,
                module_id: mod.id,
                module_name: mod.module_name,
                created_by: auth.login_id,
            };

            try {
                await commonService.add(apiUrlsService.purchaseModulesByEntity, requestData);
                swal("Saved", `${mod.module_name} Module`, "success");
                setModuleCheckboxes(prev => ({
                    ...prev,
                    [mod.id]: { checked: true, saving: false }
                }));
                getAllModuleslist(selectedEntityId); // Refresh list
            } catch (error) {
                swal("Error", error.details, "error");
                console.error("Save error:", error);
                setModuleCheckboxes(prev => ({
                    ...prev,
                    [mod.id]: { checked: false, saving: false }
                }));
            }
        } else {
            
            const requestData = {
                entity_id: selectedEntityId,
                module_id: mod.id,
            };

            try {
                await commonService.add(apiUrlsService.removeModuleFromEntity, requestData);
                swal("Removed", `${mod.module_name} deselected`, "info");

                setModuleCheckboxes(prev => ({
                    ...prev,
                    [mod.id]: { checked: false, saving: false }
                }));
                getAllModuleslist(selectedEntityId); // Refresh list
            } catch (err) {
                swal("Error", "Remove failed", "error");
                console.error("Remove error:", err);

                // rollback checkbox
                setModuleCheckboxes(prev => ({
                    ...prev,
                    [mod.id]: { checked: true, saving: false }
                }));
            }
        }
    };

    return (
        <div>
             <Row className="g-2 my-2">
                {Entities.map(mod => {
                    const state = moduleCheckboxes[mod.id] || {};
                    return (
                        <Col key={mod.id} md={6}>
                            <label className="custom-checkbox d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={state.checked || false}
                                    disabled={state.saving}
                                    onChange={(e) => handleCheckboxChange(mod, e.target.checked)}
                                    className="mx-2"
                                />
                                <span className="checkmark"></span>
                                {mod.module_name}
                            </label>
                        </Col>
                    );
                })}
            </Row>

             
        </div>
    );
};

export default ModulesMasterList;
