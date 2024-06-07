import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Table} from 'antd';
import categoryService from '../../../api/host/Category';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

function List() {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await categoryService.adminDeleteCategory(id)
                .then((res) => {
                    console.log("delete", res.data)
                    alert(`Delete success!`)
                    getListCategory();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const loadFn = async () => {
        $(document).ready(function () {
            $("#inputSearchCategory").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $(".ant-table-content table tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Category Name',
            dataIndex: 'category_name',
            width: '40%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'x',
            width: '20%',
            render: (id) =>
                <>
                    <Link to={`/admin/categories/detail/${id}`} className="btn btn-primary">
                        Details
                    </Link>

                    <button type="button" id={`btnDelete_${id}`} className="btn btn-danger"
                            onClick={() => handleDelete(id)}>Delete
                    </button>
                </>
        },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getListCategory = async () => {
        // await categoryService.adminListCategory()
        //     .then((res) => {
        //         if (res.status === 200) {
        //             console.log("data", res.data)
        //             setData(res.data)
        //             setLoading(false)
        //         }
        //     })
        //     .catch((err) => {
        //         setLoading(false)
        //         console.log(err)
        //     })
        setData([])
        setLoading(false)
    }


    useEffect(() => {
        getListCategory();
        loadFn();
    }, []);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <>
            <Header/>
            <Sidebar/>

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>List Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Category</li>
                            <li className="breadcrumb-item active">List Category</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <div className="row">
                    <div className="mb-3 col-md-3">
                        <h5>Search Category</h5>
                        <input className="form-control" id="inputSearchCategory" type="text" placeholder="Search.."/>
                        <br/>
                    </div>
                    <Table
                        style={{margin: "auto"}}
                        columns={columns}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>
            </main>
        </>
    )
}

export default List