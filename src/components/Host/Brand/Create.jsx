import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message, Table} from 'antd';
import brandService from '../../../api/host/Brand';
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

        await brandService.adminCreateBrand(formData)
            .then((res) => {
                console.log("create category", res.data)
                message.success("Create brand success!")
                navigate("/admin/brands/list")
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
                    <h1>Create Brand</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Brand</li>
                            <li className="breadcrumb-item active">Create Brand</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create Brand</h5>
                                    <Form onFinish={onFinish} id="formCreate">
                                        <div className="form-group">
                                            <label htmlFor="brand_name">Name</label>
                                            <input type="text" className="form-control" id="brand_name"
                                                   name="brand_name" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="brand_description">Description</label>
                                            <textarea className="form-control" id="brand_description"
                                                      name="brand_description" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="image">Image</label>
                                            <input type="file" className="form-control" id="image" name="image"
                                                   required/>
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