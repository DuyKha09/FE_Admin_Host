import React, {useEffect} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message} from 'antd';
import serviceService from '../../../api/host/Service';
import {Link, useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

function Detail() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const detailsAccount = async () => {
            await serviceService.adminDetailService(id)
                .then((res) => {
                    console.log("details services", res.data);
                    $('#service_name').val(res.data.service_name);
                    $('#service_description').val(res.data.service_description);
                    $('#startTime').val(res.data.startTime);
                    $('#endTime').val(res.data.endTime);
                    $('#brand_id').val(res.data.brand_id);
                    $('#category_id').val(res.data.category_id);
                    $('#location_id').val(res.data.location_id);
                    $('#image').val(res.data.image);
                })
                .catch((err) => {
                    console.log(err)
                })
        };
        detailsAccount();
    }, [form, id])


    const onFinish = async () => {
        var service_name = document.getElementById("service_name").value;
        var service_description = document.getElementById("service_description").value;
        var startTime = document.getElementById("startTime").value;
        var endTime = document.getElementById("endTime").value;
        var brand_id = document.getElementById("brand_id").value;
        var category_id = document.getElementById("category_id").value;
        var location_id = document.getElementById("location_id").value;
        var image = document.getElementById("image").value;

        let updateData = {
            service_name: service_name,
            service_description: service_description,
            startTime: startTime,
            endTime: endTime,
            brand_id: brand_id,
            category_id: category_id,
            location_id: location_id,
            image: image
        }

        await serviceService.adminUpdateService(id, updateData)
            .then((res) => {
                console.log("data", res.data)
                alert("Update success")
                navigate("/admin/services/list")
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
                                                <input type="text" className="form-control" id="image" name="image"
                                                       required/>
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