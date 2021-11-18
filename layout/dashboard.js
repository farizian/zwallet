import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, Row, Col } from "reactstrap";
import styles from "../styles/LayDashboard.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import { MdWindow, MdLogout } from "react-icons/md";
import Menu from '../components/menu'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";

const Dashboard = (props) =>{
    const router = useRouter();
    const handleLogOut = () =>{
        localStorage.removeItem("token")
        router.push("/landpage")
    }
    return(
        <div style={{backgroundColor:'#E5E5E5'}}>
            <Navbar data={"based"}/>
            <main className={`py-lg-5 py-0 ${styles.bgDashboard} `} style={{backgroundColor:'transparent'}}>
                <Container  className="">
                    <Row>
                        <Col  md="3" className={`d-flex justify-content-end p-0`}>
                        <Menu/>
                        </Col>
                        <Col xs="12" md="9" className={`${window.matchMedia("(max-width: 576px)").matches?"p-0":''}`}>
                            {props.children}
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
export default Dashboard