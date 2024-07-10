import React from 'react'

function Sidebar() {

    return (
        <>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/host">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        {/* <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse"
                           href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Category</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a> */}
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/host/categories/list">
                                    <i className="bi bi-circle"></i><span>List Category</span>
                                </a>
                            </li>
                            <li>
                                <a href="/host/categories/create">
                                    <i className="bi bi-circle"></i><span>Create Category</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                           href="#">
                            <i className="bi bi-journal-text"></i><span>Services</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/host/services/list">
                                    <i className="bi bi-circle"></i><span>List Services</span>
                                </a>
                            </li>
                            <li>
                                <a href="/host/services/create">
                                    <i className="bi bi-circle"></i><span>Create Services</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        {/* <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                           href="#">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Brands</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a> */}
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/host/brands/list">
                                    <i className="bi bi-circle"></i><span>List Brands</span>
                                </a>
                            </li>
                            <li>
                                <a href="/host/brands/create">
                                    <i className="bi bi-circle"></i><span>Create Brands</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#Appointments-nav" data-bs-toggle="collapse"
                           href="#">
                            <i className="bi bi-list-ol"></i><span>Appointments</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="Appointments-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/host/my/appointments">
                                    <i className="bi bi-circle"></i><span>My Appointments</span>
                                </a>
                            </li>
                            {/* <li>
                                <a href="/host/appointments/list">
                                    <i className="bi bi-circle"></i><span>List Appointments</span>
                                </a>
                            </li>
                            <li>
                                <a href="/host/appointments/create">
                                    <i className="bi bi-circle"></i><span>Create Appointment</span>
                                </a>
                            </li> */}
                        </ul>
                    </li>

                    <li className="nav-heading">Chọn hình thức thanh toán</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/host/payment/show">
                            <i className="bi bi-person"></i>
                            <span>Payment</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar