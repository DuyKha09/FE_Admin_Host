import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message, Table} from 'antd';
import $ from 'jquery';
import serviceService from '../../../api/host/Service';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

window.jQuery = $;
window.$ = $;
import brandService from "../../../api/host/Brand";
import categoryService from "../../../api/host/Category";
import locationService from "../../../api/host/Location";

const MyModal = () => {
    useEffect(() => {
        $('#exampleModal').modal('hide');
    }, []);

    const handleHide = () => {
        $('#exampleModal').modal('hide');
    };

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={handleHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src="#" alt="" id="imgMarketing"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={handleHide}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Create() {
    const navigate = useNavigate()

    const handleHide = () => {
        $('#exampleModalLive').css('display', 'none');
    };

    const loadBrand = async () => {
        await brandService.adminListBrand()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadBrand", res.data.data)
                    // setData(res.data)
                    renderBrand(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadCategory = async () => {
        await categoryService.adminListCategory()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadCategory", res.data.data)
                    // setData(res.data)
                    renderCategory(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadLocation = async () => {
        await locationService.adminListLocation()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadLocation", res.data.data)
                    // setData(res.data)
                    renderLocation(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function renderLocation(data) {
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let location = data[i];
            html += `<option value="${location.id}">${location.location_name}</option>`
        }
        $('#location_id').empty().append(html);
    }

    function renderBrand(data) {
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let brand = data[i];
            html += `<option value="${brand.id}">${brand.brand_name}</option>`
        }
        $('#brand_id').empty().append(html);
    }

    function renderCategory(data) {
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let category = data[i];
            html += `<option value="${category.id}">${category.category_name}</option>`
        }
        $('#category_id').empty().append(html);
    }

    function clickHandleImage() {
        var loadFile = function (event) {
            var output = document.getElementById('imagePreview');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.classList.remove('d-none');
            output.onload = function () {
                URL.revokeObjectURL(output.src)
            }

            var output2 = document.getElementById('imgMarketing');
            output2.src = URL.createObjectURL(event.target.files[0]);
            output2.onload = function () {
                URL.revokeObjectURL(output2.src)
            }
        };

        $('#image').change(function (event) {
            loadFile(event);
        });

        $('#imagePreview').click(function () {
            $('#exampleModalLive').css('display', 'block');
        })
    }

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Creating...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' not empty!');
                $('#btnCreate').prop('disabled', false).text('Create');
                return
            }
        }

        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        if (startTime && endTime) {
            if (startTime > endTime) {
                alert('End time must be later than start time.');
                $('#btnCreate').prop('disabled', false).text('Create');
                return;
            }
        } else {
            alert('Both start time and end time are required.');
            $('#btnCreate').prop('disabled', false).text('Create');
            return;
        }

        const formData = new FormData($('#formCreate')[0]);

        await serviceService.adminCreateService(formData)
            .then((res) => {
                console.log("create service", res.data)
                message.success("Create service success!")
                navigate("/host/services/list")
            })
            .catch((err) => {
                console.log(err)
                message.error("Error,please try again")
                $('#btnCreate').prop('disabled', false).text('Create');
            })
    };

    useEffect(() => {
        clickHandleImage();
        loadBrand();
        loadCategory();
        loadLocation();
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Create Service</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Service</li>
                            <li className="breadcrumb-item active">Create Service</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create Service</h5>
                                    <Form onFinish={onFinish} id="formCreate">
                                        <div className="form-group">
                                            <label htmlFor="service_name">Name</label>
                                            <input type="text" className="form-control" id="service_name"
                                                   name="service_name" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="service_description">Description</label>
                                            <textarea className="form-control" id="service_description"
                                                      name="service_description" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="service_price">service_price</label>
                                            <input type="number" className="form-control" id="service_price"
                                                   name="service_price" required/>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="startTime">startTime</label>
                                                <input type="time" className="form-control" id="startTime"
                                                       name="startTime" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="endTime">endTime</label>
                                                <input type="time" className="form-control" id="endTime"
                                                       name="endTime" required/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="brand_id">brand_id</label>
                                                <select name="brand_id" id="brand_id" className="form-select">

                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="category_id">category_id</label>
                                                <select name="category_id" id="category_id" className="form-select">

                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="location_id">location_id</label>
                                                <select name="location_id" id="location_id" className="form-select">

                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="image">Image</label>
                                                <input type="file" accept="image/png, image/jpeg"
                                                       className="form-control" id="image" name="image"
                                                       required/>
                                                <img src="" alt=" Please select image upload" id="imagePreview"
                                                     width="200px" className="mt-3 d-none"/>
                                            </div>
                                        </div>
                                        <button type="submit" id="btnCreate" className="btn btn-primary mt-3">Create
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="modalMain" id="exampleModalLive" tabIndex="-1"
                 aria-labelledby="exampleModalLiveLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex justify-content-center align-items-center">
                            <img src="" alt="" id="imgMarketing" className="w-50"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={handleHide}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create