import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Form, message} from 'antd';
import brandService from '../../../api/host/Brand';
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
            await brandService.adminDetailBrand(id)
                .then((res) => {
                    console.log("details brand", res.data);
                    $('#brand_name').val(res.data.brand_name);
                    $('#brand_description').val(res.data.brand_description);
                    $('#image').val(res.data.image);
                })
                .catch((err) => {
                    console.log(err)
                })
        };
        detailsAccount();
    }, [form, id])


    const onFinish = async () => {
        var brand_name = document.getElementById("brand_name").value;
        var brand_description = document.getElementById("brand_description").value;
        var image = document.getElementById("image").value;
        let updateData = {
            brand_name: brand_name,
            brand_description: brand_description,
            image: image
        }

        await brandService.adminUpdateBrand(id, updateData)
            .then((res) => {
                console.log("data", res.data)
                alert("Update success")
                navigate("/admin/brands/list")
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
                    <h1>Detail Brand</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Brand</li>
                            <li className="breadcrumb-item active">Detail Brand</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Detail Brand</h5>
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
                                            <input type="text" className="form-control" id="image" name="image"
                                                   required/>
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