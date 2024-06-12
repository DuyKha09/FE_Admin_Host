import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Link, useNavigate, useParams} from 'react-router-dom';
import categoryService from '../../../api/host/Category';
import {Form, message} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

function Detail() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const detailsAccount = async () => {
            await categoryService.adminDetailCategory(id)
                .then((res) => {
                    console.log("details category", res.data);
                    $('#category_name').val(res.data.category_name);
                    $('#category_description').val(res.data.category_description);
                    $('#image').val(res.data.image);
                })
                .catch((err) => {
                    console.log(err)
                })
        };
        detailsAccount();
    }, [form, id])


    const onFinish = async () => {
        var category_name = document.getElementById("category_name").value;
        var category_description = document.getElementById("category_description").value;
        var image = document.getElementById("image").value;
        let updateData = {
            category_name: category_name,
            category_description: category_description,
            image: image
        }

        await categoryService.adminUpdateCategory(id, updateData)
            .then((res) => {
                console.log("data", res.data)
                alert("Update success")
                navigate("/admin/categories/list")
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
                    <h1>Detail Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Category</li>
                            <li className="breadcrumb-item active">Detail Category</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Detail Category</h5>
                                    <Form onFinish={onFinish} id="formCreate">
                                        <div className="form-group">
                                            <label htmlFor="category_name">Name</label>
                                            <input type="text" className="form-control" id="category_name"
                                                   name="category_name " required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="category_description">Description</label>
                                            <textarea className="form-control" id="category_description"
                                                      name="category_description" required></textarea>
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