/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { API_URL } from "../helpers/env"
import styles from "../styles/Navbar.module.css"
import { BsBell, BsEnvelope, BsHouseDoor, BsSearch, BsPerson } from "react-icons/bs";
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Link from 'next/link';
import Router from 'next/router'
import Image from "next/dist/client/image";
import CurrencyFormat from 'react-currency-format'
import axios from "axios";


const Navbar=({data})=>{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  
  const getTrans = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}transaction`, {headers} )
      .then((response) => {
        resolve(response.data.result);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  const getMyData = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}mydetail`, {headers} )
      .then((response) => {
        resolve(response.data.result);
        console.log(response.data.result)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  const [history, setHistory] = useState([])
  const [user, setUser] = useState({})
  useEffect(() => {
    const token = localStorage.getItem('token')
    getMyData(token).then(result => {
      console.log(result)
      setUser(result)
    }).catch(err => {
      console.log(err)
    })
    getTrans(token).then(result => {
      setHistory(result)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const toProfile = () => {
    Router.push("/profile");
  };

  const toDash = () => {
    Router.push("/home");
  };
  const toHistory = () => {
    Router.push("/history");
  };
  return (
    <>
    {data==="landing"?(
      <nav className={`d-flex align-items-center justify-content-center ${styles.nav}`}>
        <Container>
          <Row>
            <Col md="6" xs="12"  className={`${styles.navbarLeft}`}>
              <Image src="/Zwallet.png" onClick={()=>Router.push('/')} className={styles.zimg} alt="" width="102px" height="25px"/>
            </Col>
            <Col md="6" xs="12">
              <div className={`d-flex align-items-center justify-content-lg-end justify-content-sm-center ${styles.btnNavbar}`}>
                <button
                  className={`btn ${styles.btnlogin} fw-bold text-white`}
                  onClick={()=> Router.push("/login")} exact
                >
                  Login
                </button>
                <button className={`btn ${styles.btnsignup} fw-bold`} exact onClick={()=> Router.push("/signup")}>
                  Sign Up
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </nav>
    ):(
      <div>
      <nav className={`d-lg-flex d-none align-items-center justify-content-center ${styles.nav2}`}>
        <Container fluid={true}>
          <Row>
            <Col md="6" xs="12"  className={`${styles.navbarLeft}`}>
              <h1 className={styles.h1} onClick={()=>Router.push('/home')}>Zwallet</h1>
            </Col>
            <Col md="6" xs="12">
              <div className={`d-flex justify-content-end align-items-center ${styles.profile}`}>
                <img src={`${API_URL}uploads/${user.image}`} width="52px" height="52px" style={{borderRadius:'10px'}} alt=""/>
                <div className={`d-flex flex-column ${styles.textbox}`}>
                  <h3>{`${user.firstname} ${user.lastname}`}</h3>
                  <p>+62 {user.phone}</p>
                </div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle className="mt-lg-2"
                  style={{backgroundColor:'transparent', border:'none'}}>
                    <Image src="/bell.png" width="24px" height="24px" alt=""/>
                  </DropdownToggle>
                  <DropdownMenu right className={`mt-lg-4 py-lg-4 ${styles.dropmenu}`}>
                    <div className={`px-lg-4 ${styles.dropmenubox}`}>
                    {history.map((e, i) => {
                      return(
                        <div key={i} className={`row p-2 d-flex ${styles.rowhist}`}>
                          <div className={`d-flex w-100 align-items-center`}>
                            {user.id !== e.receiver?<AiOutlineArrowUp color="red" style={{fontSize:'30px', marginRight:'10px'}}/>:<AiOutlineArrowDown color="green" style={{fontSize:'30px', marginRight:'10px'}}/>}
                            <div className={`d-flex flex-column ${styles.fontbox}`}>
                              <p>
                                {e.notes==='Top Up'?`${e.notes} ZWallet`
                                :e.notes==='Transfer'?`${e.notes} to ${e.receiverUsers.firstname} ${e.receiverUsers.lastname}`
                                :`${e.notes} from ${e.senderUsers.firstname} ${e.senderUsers.lastname}`}
                              </p>
                              <CurrencyFormat className={`d-flex align-items-center ${styles.amount}`} value={e.amount} style={user.id === e.receiver?{color:'green'}:{color:'red'}} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp.'}/>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    </div>
                  </DropdownMenu>
                </Dropdown>
                
              </div>
            </Col>
          </Row>
        </Container>
      </nav>
      {/* navbar bottom */}
      <nav
        className={`d-lg-none d-block navbar ${styles.navbarBottom} fixed-bottom`}
        role="navigation"
      >
        <Nav className="w-100 h-100">
          <div className=" d-flex flex-row bg-white p-2 justify-content-around w-100">
            <div className="row d-flex iconNavbar   flex-column justify-content-center align-items-center">
              <BsHouseDoor onClick={toDash} size={28} />
            </div>

            <div className="row d-flex iconNavbar flex-column  justify-content-center align-items-center">
              <BsBell size={28} onClick={toHistory}/>
            </div>

            <div className="row d-flex iconNavbar flex-column  justify-content-center align-items-center">
              <BsPerson onClick={toProfile} size={28} />
            </div>
          </div>
        </Nav>
      </nav>
      </div>
    )}
    </>
  );
}

export default Navbar;
