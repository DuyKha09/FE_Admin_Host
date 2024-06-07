import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Css from './Lib/StyleSheet.jsx';
import Script from './Lib/Script.jsx';

function IsAdmin() {
    return (
        <>
            <li>
                <Link className="dropdown-item d-flex align-items-center" to="/host">
                    <i className="bi bi-0-circle"/>
                    <span>Host</span>
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider"/>
            </li>
        </>
    )
}

function Header() {
    const AuthName = sessionStorage.getItem("username");
    const tokenUser = sessionStorage.getItem("accessToken");
    const idUser = sessionStorage.getItem("id");
    const navigate = useNavigate();

    let isAdmin = true;

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        alert('Logout success!')
        window.location.href = `/login`;
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <Css/>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <img src="/assets/admin/img/logo.png" alt=""/>
                        <span className="d-none d-lg-block">Fur Ever Friend</span>
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <div className="search-bar">
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle " href="#">
                                <i className="bi bi-search"></i>
                            </a>
                        </li>

                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                               data-bs-toggle="dropdown">
                                <img src="/assets/admin/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                                <span className="d-none d-md-block dropdown-toggle ps-2">fullName</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>fullName</h6>
                                    <span>userName</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="/profile">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            <Script/>
        </>
    )
}

export default Header