import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message, Table} from 'antd';
import serviceService from '../../../api/host/Service';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

function Create() {
    const navigate = useNavigate();

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

        const formData = new FormData($('#formCreate')[0]);

        await serviceService.adminCreateService(formData)
            .then((res) => {
                console.log("create service", res.data)
                message.success("Create service success!")
                navigate("/admin/services/list")
            })
            .catch((err) => {
                console.log(err)
                message.error("Error,please try again")
                $('#btnCreate').prop('disabled', false).text('Create');
            })
    };

    useEffect(() => {

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
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="startTime">startTime</label>
                                                <input type="text" className="form-control" id="startTime"
                                                       name="startTime" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="endTime">endTime</label>
                                                <input type="text" className="form-control" id="endTime"
                                                       name="endTime" required/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="brand_id">brand_id</label>
                                                <input type="text" className="form-control" id="brand_id"
                                                       name="brand_id" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="category_id">category_id</label>
                                                <input type="text" className="form-control" id="category_id"
                                                       name="category_id" required/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="location_id">location_id</label>
                                                <input type="text" className="form-control" id="location_id"
                                                       name="location_id" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="image">Image</label>
                                                <input type="file" className="form-control" id="image" name="image"
                                                       required/>
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