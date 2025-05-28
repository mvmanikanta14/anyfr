import React, { useContext, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { motion } from "framer-motion";
import { Users, ShoppingCart, DollarSign, Headset } from "lucide-react";
import SidebarMenu from "./SidebarMenu"; // Sidebar on the left
import EntityDashboard from "./EntityDashboard";
import EntityDashboardList from "./entites/EntityDashboardList";
import { ApiContext } from "../services/ApiProvider";
  
export default function Dashboard() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const barData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Sales",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderRadius: 4,
            },
        ],
    };

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [15, 10, 8, 12, 6, 14],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const [Welcomehand, setHiHand] = useState(process.env.PUBLIC_URL + "/hi-hand.gif");
    const { auth } = useContext(ApiContext);

    return (
        <div className="d-flex">
            <Container fluid>
                <div className="breadcrumb-area text-center"> 
                    <b className="theme-text font-style1"> Welcome &nbsp; 
                        {auth.username ? auth.username : ""} </b>  
                       
                    <img
                            src={Welcomehand}
                            alt="Welcome hand"
                            height="30"
                        />

                     
                    <span className="fs-10 "> here’s what’s lined up in your financial dashboard today.  </span> 
                </div>
                {/* Main Content Area */}
                <div className="page-content-full ">
                    <Row className="g-4 d-lg-none">
                        <Col md={3}>
                            <motion.div variants={cardVariants} initial="hidden" animate="visible">
                                <Card className="px-3 py-2 d-flex flex-row justify-content-start stylish-card users-card">
                                    <div className="icon-wrapper">
                                        <Users size={28} color="#fff" />
                                    </div>
                                    <div className="text-start mx-3">
                                        <h5>Total Users</h5>
                                        <h3>1,245</h3>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>

                        <Col md={3}>
                            <motion.div variants={cardVariants} initial="hidden" animate="visible">
                                <Card className="px-3 py-2 d-flex flex-row justify-content-start stylish-card orders-card">
                                    <div className="icon-wrapper">
                                        <ShoppingCart size={28} color="#fff" />
                                    </div>
                                    <div className="text-start mx-3">
                                        <h5>New Orders</h5>
                                        <h3>567</h3>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>

                        <Col md={3}>
                            <motion.div variants={cardVariants} initial="hidden" animate="visible">
                                <Card className="px-3 py-2 d-flex flex-row justify-content-start stylish-card revenue-card">
                                    <div className="icon-wrapper">
                                        <DollarSign size={28} color="#fff" />
                                    </div>
                                    <div className="text-start mx-3">
                                        <h5>Revenue</h5>
                                        <h3>$12,345</h3>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>

                        <Col md={3}>
                            <motion.div variants={cardVariants} initial="hidden" animate="visible">
                                <Card className="px-3 py-2 d-flex flex-row justify-content-start stylish-card support-card">
                                    <div className="icon-wrapper">
                                        <Headset size={28} color="#fff" />
                                    </div>
                                    <div className="text-start mx-3">
                                        <h5>Support Tickets</h5>
                                        <h3>85</h3>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>
                    </Row>

                    <Row className=" ">
                        <Col md={6}>
                            <div className=" ">
                                <EntityDashboardList />
                            </div>
                        </Col>
                        
                    </Row>


                </div>
            </Container>
        </div>
    );
}
