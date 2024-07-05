import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Table} from 'antd';
import appointmentService from '../../../api/host/Appointments.js';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

function List() {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to confirm?')) {
            await appointmentService.adminConfirmAppointment(id)
                .then((res) => {
                    console.log("config", res.data)
                    alert(`Confirm success!`)
                    getListCategory();
                })
                .catch((err) => {
                    let mess = err.response.data.response.message;
                    alert(mess);
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
            dataIndex: 'index',
            width: '15%',
        },
        {
            title: 'Pet',
            dataIndex: ['pet', 'pet_name'],
            width: '20%',
        },
        {
            title: 'Service',
            dataIndex: ['service', 'service_name'],
            width: '20%',
        },
        {
            title: 'appointment_date',
            dataIndex: 'appointment_date',
            width: '10%',
            render: (date) => {
                const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                return formattedDate;
            },
        },
        {
            title: 'appointment_time',
            dataIndex: 'appointment_time',
            width: '10%',
        },
        {
            title: 'status',
            dataIndex: 'status',
            width: '10%',
            render: (status) => (status ? 'Đã xác nhận' : 'Chưa xác nhận'),
        },
        {
            title: 'Action',
            dataIndex: 'appointment_id',
            key: 'x',
            width: '25%',
            render: (id, record) =>
                <>
                    <button type="button" id={`btnDelete_${id}`}
                            className={record.status ? 'btn btn-success' : 'btn btn-warning'} disabled={record.status}
                            onClick={() => handleDelete(id)}>{record.status ? 'Đã xác nhận' : 'Xác nhận'}
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
        await appointmentService.hostMyAppointment()
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    setData(res.data.data)
                    setLoading(false)
                } else {
                    alert('Error')
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
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

    const dataSource = data.map((item, index) => ({
        ...item,
        key: item.id,
        index: index + 1, // Index starts from 1
    }));

    return (
        <>
            <Header/>
            <Sidebar/>

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>List Appointment</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item">Appointment</li>
                            <li className="breadcrumb-item active">List Appointment</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <div className="row">
                    <div className="mb-3 col-md-3">
                        <h5>Search Appointment</h5>
                        <input className="form-control" id="inputSearchCategory" type="text" placeholder="Search.."/>
                        <br/>
                    </div>
                    <Table
                        style={{margin: "auto"}}
                        columns={columns}
                        dataSource={dataSource}
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