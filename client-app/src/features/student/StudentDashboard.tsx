import { Grid, Header, Segment } from "semantic-ui-react";
import React from 'react';
import Breadcrumbs from "../../app/layout/Breadcrumbs";
import WelcomeBanner from "../../app/layout/WelcomeBanner";
import BleonaPhoto from '../../app/Images/Bleona.jpg';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import NavBar from "../../app/layout/NavBar";





export default observer(function StudentDashboard() {
    const { userStore } = useStore();
    const { user } = userStore;
    return (
        <>
        <Segment>
            <NavBar></NavBar>
        </Segment>
            <body>


                <header id="header1" className="header fixed-top d-flex align-items-center">

                    <div className="d-flex align-items-center justify-content-between">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <img src="assets/img/logo.png" alt=""></img>
                            <span className="d-none d-lg-block"></span>
                        </a>
                        <i className="bi bi-list toggle-sidebar-btn"></i>
                    </div>

                    <div className="search-bar">
                        <form className="search-form d-flex align-items-center" method="POST" action="#">
                            <input type="text" name="query" placeholder="Search" title="Enter search keyword"></input>
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

                            <li className="nav-item dropdown">

                                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                    <i className="bi bi-bell"></i>
                                    <span className="badge bg-primary badge-number">4</span>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                    <li className="dropdown-header">
                                        You have 4 new notifications
                                        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="notification-item">
                                        <i className="bi bi-exclamation-circle text-warning"></i>
                                        <div>
                                            <h4>Lorem Ipsum</h4>
                                            <p>Quae dolorem earum veritatis oditseno</p>
                                            <p>30 min. ago</p>
                                        </div>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="notification-item">
                                        <i className="bi bi-x-circle text-danger"></i>
                                        <div>
                                            <h4>Atque rerum nesciunt</h4>
                                            <p>Quae dolorem earum veritatis oditseno</p>
                                            <p>1 hr. ago</p>
                                        </div>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="notification-item">
                                        <i className="bi bi-check-circle text-success"></i>
                                        <div>
                                            <h4>Sit rerum fuga</h4>
                                            <p>Quae dolorem earum veritatis oditseno</p>
                                            <p>2 hrs. ago</p>
                                        </div>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="notification-item">
                                        <i className="bi bi-info-circle text-primary"></i>
                                        <div>
                                            <h4>Dicta reprehenderit</h4>
                                            <p>Quae dolorem earum veritatis oditseno</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li className="dropdown-footer">
                                        <a href="#">Show all notifications</a>
                                    </li>

                                </ul>

                            </li>

                            <li className="nav-item dropdown">

                                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                    <i className="bi bi-chat-left-text"></i>
                                    <span className="badge bg-success badge-number">3</span>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                    <li className="dropdown-header">
                                        You have 3 new messages
                                        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="message-item">
                                        <a href="#">
                                            <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle"></img>
                                            <div>
                                                <h4>Maria Hudson</h4>
                                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                                <p>4 hrs. ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="message-item">
                                        <a href="#">
                                            <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle"></img>
                                            <div>
                                                <h4>Anna Nelson</h4>
                                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                                <p>6 hrs. ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="message-item">
                                        <a href="#">
                                            <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle"></img>
                                            <div>
                                                <h4>David Muldon</h4>
                                                <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                                <p>8 hrs. ago</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li className="dropdown-footer">
                                        <a href="#">Show all messages</a>
                                    </li>

                                </ul>

                            </li>

                            <li className="nav-item dropdown pe-3">

                                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                    <img src={BleonaPhoto} alt="Profile" className="rounded-circle"></img>
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{user?.firstname + " " + user?.lastname}</span>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                        <h6>Kevin Anderson</h6>
                                        <span>Web Designer</span>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li>
                                        <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                            <i className="bi bi-person"></i>
                                            <span>My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li>
                                        <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                            <i className="bi bi-gear"></i>
                                            <span>Account Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li>
                                        <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                            <i className="bi bi-question-circle"></i>
                                            <span>Need Help?</span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>

                                    <li>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <i className="bi bi-box-arrow-right"></i>
                                            <span>Sign Out</span>
                                        </a>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </nav>

                </header>

                

                <main id="main main1" className="main py-5">

                    <div className="pagetitle">
                        <h1>Profile</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/beforeloginpage">Home</a></li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </nav>
                    </div>

                    <section className="section profile">
                        <div className="row">
                            <div className="col-xl-4">

                                <div className="card">
                                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                        <img src={BleonaPhoto} alt="Profile" className="rounded-circle"></img>
                                        <h2>{user?.firstname+" "+user?.lastname}</h2>
                                        <h3>{user?.role}</h3>
                                        <div className="social-links mt-2">
                                            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-8">

                                <div className="card">
                                    <div className="card-body pt-3">

                                        <ul className="nav nav-tabs nav-tabs-bordered">

                                            <li className="nav-item">
                                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                            </li>

                                        </ul>
                                        <div className="tab-content pt-2">

                                            <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                <h5 className="card-title">About</h5>
                                                <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                                                <h5 className="card-title">Profile Details</h5>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                    <div className="col-lg-9 col-md-8">Kevin Anderson</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Company</div>
                                                    <div className="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Job</div>
                                                    <div className="col-lg-9 col-md-8">Web Designer</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Country</div>
                                                    <div className="col-lg-9 col-md-8">USA</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Address</div>
                                                    <div className="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Phone</div>
                                                    <div className="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Email</div>
                                                    <div className="col-lg-9 col-md-8">k.anderson@example.com</div>
                                                </div>

                                            </div>

                                            <div className="tab-pane fade profile-edit pt-3" id="profile-edit">


                                                <form>
                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <img src="assets/img/profile-img.jpg" alt="Profile"></img>
                                                            <div className="pt-2">
                                                                <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                                                <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="fullName" type="text" className="form-control" id="fullName" value="Kevin Anderson"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">About</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <textarea name="about" className="form-control" id="about" >Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Company</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="company" type="text" className="form-control" id="company" value="Lueilwitz, Wisoky and Leuschke"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Job</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="job" type="text" className="form-control" id="Job" value="Web Designer"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Country</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="country" type="text" className="form-control" id="Country" value="USA"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="address" type="text" className="form-control" id="Address" value="A108 Adam Street, New York, NY 535022"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="phone" type="text" className="form-control" id="Phone" value="(436) 486-3538 x29071"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="email" type="email" className="form-control" id="Email" value="k.anderson@example.com"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="twitter" type="text" className="form-control" id="Twitter" value="https://twitter.com/#"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="facebook" type="text" className="form-control" id="Facebook" value="https://facebook.com/#"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="instagram" type="text" className="form-control" id="Instagram" value="https://instagram.com/#"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="linkedin" type="text" className="form-control" id="Linkedin" value="https://linkedin.com/#"></input>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                                    </div>
                                                </form>

                                            </div>

                                            <div className="tab-pane fade pt-3" id="profile-settings">




                                            </div>

                                            <div className="tab-pane fade pt-3" id="profile-change-password">

                                                <form>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="changesMade" checked></input>
                                                                <label className="form-check-label" >
                                                                    Changes made to your account
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="newProducts" checked></input>
                                                                <label className="form-check-label" >
                                                                    Information on new products and services
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="proOffers"></input>
                                                                <label className="form-check-label" >
                                                                    Marketing and promo offers
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="securityNotify" checked disabled></input>
                                                                <label className="form-check-label" >
                                                                    Security alerts
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                                    </div>
                                                </form>

                                            </div>

                                            <div className="tab-pane fade pt-3" id="profile-change-password">

                                                <form>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="password" type="password" className="form-control" id="currentPassword"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="newpassword" type="password" className="form-control" id="newPassword"></input>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="renewpassword" type="password" className="form-control" id="renewPassword"></input>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary">Change Password</button>
                                                    </div>
                                                </form>





                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                </main>


                <footer id="footer" className="footer">
                    <div className="copyright">
                        &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </footer>

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>


                <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
                <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="assets/vendor/chart.js/chart.min.js"></script>
                <script src="assets/vendor/echarts/echarts.min.js"></script>
                <script src="assets/vendor/quill/quill.min.js"></script>
                <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
                <script src="assets/vendor/tinymce/tinymce.min.js"></script>
                <script src="assets/vendor/php-email-form/validate.js"></script>


                <script src="assets/js/main.js"></script>

            </body>

        </>

    )
})