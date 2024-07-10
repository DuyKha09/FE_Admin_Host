import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message} from 'antd';
import serviceService from '../../../api/host/Service';
import {Link, useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import brandService from "../../../api/host/Brand.js";
import categoryService from "../../../api/host/Category.js";
import locationService from "../../../api/host/Location.js";

function Detail() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const loadBrand = async (id) => {
        await brandService.adminListBrand(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadBrand", res.data.data)
                    // setData(res.data)
                    renderBrand(res.data.data, id)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadCategory = async (id) => {
        await categoryService.adminListCategory()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadCategory", res.data.data)
                    // setData(res.data)
                    renderCategory(res.data.data, id)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadLocation = async (id) => {
        await locationService.adminListLocation()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadLocation", res.data.data)
                    // setData(res.data)
                    renderLocation(res.data.data, id)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTimeChange = () => {
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;

        let startTimeConvert = null;
        let endTimeConvert = null;

        const [hour, minute] = startTime.split(':');
        let minuteInt = parseInt(minute, 10);

        if (minuteInt < 15) {
            minuteInt = 0;
            startTimeConvert = `${hour}:${String(minuteInt).padStart(2, '0')}`;
        } else if (minuteInt < 45) {
            minuteInt = 30;
            startTimeConvert = `${hour}:${String(minuteInt).padStart(2, '0')}`;
        } else {
            minuteInt = 0;
            let hourInt = parseInt(hour, 10);
            hourInt = (hourInt + 1) % 24;
            startTimeConvert = `${String(hourInt).padStart(2, '0')}:${String(minuteInt).padStart(2, '0')}`;
        }

        const [hour2, minute2] = endTime.split(':');
        let minuteInt2 = parseInt(minute2, 10);

        if (minuteInt2 < 15) {
            minuteInt2 = 0;
            endTimeConvert = `${hour2}:${String(minuteInt2).padStart(2, '0')}`;
        } else if (minuteInt2 < 45) {
            minuteInt2 = 30;
            endTimeConvert = `${hour2}:${String(minuteInt2).padStart(2, '0')}`;
        } else {
            minuteInt2 = 0;
            let hourInt = parseInt(hour2, 10);
            hourInt = (hourInt + 1) % 24;
            endTimeConvert = `${String(hourInt).padStart(2, '0')}:${String(minuteInt2).padStart(2, '0')}`;
        }

        $('#startTime').val(startTimeConvert)
        $('#endTime').val(endTimeConvert)
    };

    function renderLocation(data, id) {
        let select = '';
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let location = data[i];

            if (location.id === id) {
                select = 'selected';
            } else {
                select = ''
            }

            html += `<option ${select} value="${location.id}">${location.location_name}</option>`
        }
        $('#location_id').empty().append(html);
    }

    function renderBrand(data, id) {
        let select = '';
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let brand = data[i];

            if (brand.id === id) {
                select = 'selected';
            } else {
                select = ''
            }

            html += `<option ${select} value="${brand.id}">${brand.brand_name}</option>`
        }
        $('#brand_id').empty().append(html);
    }

    function renderCategory(data, id) {
        let select = '';
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let category = data[i];

            if (category.id === id) {
                select = 'selected';
            } else {
                select = ''
            }

            html += `<option ${select} value="${category.id}">${category.category_name}</option>`
        }
        $('#category_id').empty().append(html);
    }

    const detailsAccount = async () => {
        await serviceService.adminDetailService(id)
            .then((res) => {
                console.log("details services", res.data);

                $('#service_name').val(res.data.data.service_name);
                $('#service_description').val(res.data.data.service_description);
                $('#service_price').val(res.data.data.price);
                $('#startTime').val(res.data.data.starttime);
                $('#endTime').val(res.data.data.endtime);
                $('#brand_id').val(res.data.data.brand.id);
                $('#category_id').val(res.data.data.category.id);
                $('#location_id').val(res.data.data.location.id);

                $('#imagePreview').attr('src', res.data.data.image);
                $('#imgMarketing').attr('src', res.data.data.image);

                loadBrand(res.data.data.brand.id);
                loadCategory(res.data.data.category.id);
                loadLocation(res.data.data.location.id);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        detailsAccount();
        clickHandleImage();
    }, [form, id])

    const handleHide = () => {
        $('#exampleModalLive').css('display', 'none');
    };

    function clickHandleImage() {
        var loadFile = function (event) {
            var output = document.getElementById('imagePreview');
            output.src = URL.createObjectURL(event.target.files[0]);
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
        $('#btnCreate').prop('disabled', true).text('Updating...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
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

        await serviceService.adminUpdateService(id, formData)
            .then((res) => {
                console.log("data", res.data)
                alert("Update success")
                navigate("/host/services/list")
            })
            .catch((err) => {
                console.log(err)
                message.error("Update error")
                $('#btnCreate').prop('disabled', false).text('Update');
            })
    };

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Detail Service</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Service</li>
                            <li className="breadcrumb-item active">Detail Service</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Detail Service</h5>
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
                                                       name="startTime" onChange={handleTimeChange} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="endTime">endTime</label>
                                                <input type="time" className="form-control" id="endTime"
                                                       name="endTime" onChange={handleTimeChange} required/>
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
                                                       className="form-control" id="image" name="image"/>
                                                <img src="" alt="imagePreview" id="imagePreview" width="200px"
                                                     className="mt-3"/>
                                            </div>
                                        </div>
                                        <button type="submit" id="btnCreate" className="btn btn-primary mt-3">Update
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

export default Detail