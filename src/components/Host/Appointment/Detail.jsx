import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message} from 'antd';
import appointmentService from '../../../api/host/Appointments.js';
import {Link, useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import petService from "../../../api/host/Pet.js";
import serviceService from "../../../api/host/Service.js";

function Detail() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const loadPet = async (id) => {
        await petService.adminListPet()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadCategory", res.data.data)
                    // setData(res.data)
                    renderPet(res.data.data, id)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadService = async (id) => {
        await serviceService.adminListService()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadLocation", res.data.data)
                    // setData(res.data)
                    renderService(res.data.data, id)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function renderService(data, id) {
        let html = ``;
        let select = '';
        for (let i = 0; i < data.length; i++) {
            let service = data[i];
            if (service.id === id) {
                select = 'selected';
            } else {
                select = ''
            }
            html += `<option ${select} value="${service.id}">${service.service_name}</option>`
        }
        $('#service_id').empty().append(html);
    }

    function renderPet(data, id) {
        let html = ``;
        let select = '';
        for (let i = 0; i < data.length; i++) {
            let pet = data[i];
            if (pet.id === id) {
                select = 'selected';
            } else {
                select = ''
            }
            html += `<option ${select} value="${pet.id}">${pet.pet_name}</option>`
        }
        $('#pet_id').empty().append(html);
    }

    const detailsAccount = async () => {
        await appointmentService.adminDetailAppointment(id)
            .then((res) => {
                console.log("details services", res.data);

                $('#pet_id').val(res.data.data.pet_id);
                $('#service_id').val(res.data.data.service_id);
                $('#appointment_date').val(res.data.data.appointment_date);
                $('#appointment_time').val(res.data.data.appointment_time);

                loadService(res.data.data.service_id);
                loadPet(res.data.data.pet_id);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        detailsAccount();
    }, [form, id])


    const onFinish = async () => {
        var pet_id = document.getElementById("pet_id").value;
        var service_id = document.getElementById("service_id").value;
        var appointment_date = document.getElementById("appointment_date").value;
        var appointment_time = document.getElementById("appointment_time").value;

        let updateData = {
            pet_id: pet_id,
            service_id: service_id,
            appointment_date: appointment_date,
            appointment_time: appointment_time,
        }

        await appointmentService.adminUpdateAppointment(id, updateData)
            .then((res) => {
                console.log("data", res.data)
                alert("Update success")
                navigate("/host/appointments/list")
            })
            .catch((err) => {
                console.log(err)
                message.error("Update error")
            })
    };

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Detail Appointments</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Appointments</li>
                            <li className="breadcrumb-item active">Detail Appointments</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Detail Appointments</h5>
                                    <Form onFinish={onFinish} id="formCreate">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="pet_id">pet_id</label>
                                                <select name="pet_id" id="pet_id" className="form-select">

                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="service_id">service_id</label>
                                                <select name="service_id" id="service_id" className="form-select">

                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="appointment_date">appointment_date</label>
                                                <input type="datetime-local" className="form-control"
                                                       id="appointment_date"
                                                       name="appointment_date" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="appointment_time">appointment_time</label>
                                                <input type="time" className="form-control" id="appointment_time"
                                                       name="appointment_time" required/>
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
        </>
    )
}

export default Detail