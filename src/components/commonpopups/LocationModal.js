import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import commonService from "../../services/common.service";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";

const LocationModal = ({ show, handleClose, onSubmit, title, editData, showDeleteButton, deleteLocation }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (editData) {
      // Populate the form if there's data for editing
      setValue("location_name", editData.location_name);
      setValue("state", editData.state);
      setValue("city", editData.city);
      setValue("pincode", editData.pincode);
      setValue("address", editData.address);
    } else {
      // If no editData, reset the fields to empty
      reset({
        location_name: "",
        state: "",
        city: "",
        pincode: "",
        address: ""
      });
    }
  }, [editData, reset, setValue]);

  useEffect(() => {
    if (!editData) {
      // Reset the form when the modal is opened to add a new record
      reset({
        location_name: "",
        state: "",
        city: "",
        pincode: "",
        address: ""
      });
    }
  }, [editData, reset]);


  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>{title} Location</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">

          <Modal.Body className="custom-modal-body">
            <div className="p-0  modalstart">

              <div className="container">
                <div className="row pt-1 mt-1">
                  <div className="col-md-4 text-left mt-1">
                    <label>Location Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("location_name", { required: true })}
                      defaultValue={editData ? editData.location_name : ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>State Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("state", { required: true })}
                      defaultValue={editData ? editData.state : ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>City Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("city", { required: true })}
                      defaultValue={editData ? editData.city : ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Pincode <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("pincode", { required: true })}
                      defaultValue={editData ? editData.pincode : ""}
                    />
                  </div>

                  <div className="col-md-4">
                    <label>Address <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("address", { required: true })}
                      defaultValue={editData ? editData.address : ""}
                    />
                  </div>


                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between">
              {showDeleteButton && (
                <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteLocation(editData?.id)}>Delete</button>
              )}
              <button type="submit" className="btn btn-sm btn-primary">Create</button>
            </div>

          </Modal.Footer>
        </form>



      </Modal>
    </>
  );
};

export default LocationModal;
