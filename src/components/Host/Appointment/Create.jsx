import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message, Table} from 'antd';
import appointmentService from '../../../api/host/Appointments.js';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

import serviceService from "../../../api/host/Service.js";
import petService from "../../../api/host/Pet.js";

function Create() {
    const navigate = useNavigate();

    const loadPet = async () => {
        await petService.adminListPet()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadCategory", res.data.data)
                    // setData(res.data)
                    renderPet(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadService = async () => {
        await serviceService.adminListService()
            .then((res) => {
                if (res.status === 200) {
                    console.log("loadLocation", res.data.data)
                    // setData(res.data)
                    renderService(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function renderService(data) {
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let service = data[i];
            html += `<option value="${service.id}">${service.service_name}</option>`
        }
        $('#service_id').empty().append(html);
    }

    function renderPet(data) {
        let html = ``;
        for (let i = 0; i < data.length; i++) {
            let pet = data[i];
            html += `<option value="${pet.id}">${pet.pet_name}</option>`
        }
        $('#pet_id').empty().append(html);
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

        var pet_id = document.getElementById("pet_id").value;
        var service_id = document.getElementById("service_id").value;
        var appointment_date = document.getElementById("appointment_date").value;
        var appointment_time = document.getElementById("appointment_time").value;

        let data = {
            pet_id: pet_id,
            service_id: service_id,
            appointment_date: appointment_date,
            appointment_time: appointment_time + ':00',
        }

        console.log(data);

        await appointmentService.adminCreateAppointment(data)
            .then((res) => {
                console.log("create appointments", res.data)
                message.success("Create appointments success!")
                navigate("/host/appointments/list")
            })
            .catch((err) => {
                console.log(err)
                message.error("Error,please try again")
                $('#btnCreate').prop('disabled', false).text('Create');
            })
    };

    useEffect(() => {
        loadPet();
        loadService();
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Create Appointments</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Appointments</li>
                            <li className="breadcrumb-item active">Create Appointments</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create Appointments</h5>
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
                                        <button type="submit" id="btnCreate" className="btn btn-primary mt-3">Create
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

export default Create