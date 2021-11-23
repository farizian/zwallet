/* eslint-disable @next/next/no-img-element */
import Layout from '../../layout/default'
import {
  Container,
  Col,
  Row,
} from "reactstrap";
import { useState, useEffect } from 'react';
import styles from '../../styles/Trans.module.css';
import Image from 'next/dist/client/image';
import Menu from '../../components/menu'
import axios from 'axios';
import Guard from '../../HOC/guard';
import { API_URL } from '../../helpers/env';
import { BsSearch } from "react-icons/bs";
import CurrencyFormat from 'react-currency-format'
import Router from 'next/router'


const Transfer = () => {
  const [search, setSearch] = useState("")
  const getMyData = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}mydetail`, {headers} )
      .then((response) => {
        resolve(response.data.result);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  const getAllUser = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}users`, {headers} )
      .then((response) => {
        resolve(response.data.result);
        console.log(response.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
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

  const startSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}users?search=${search}`, {headers} )
      .then((response) => {
        setUsers(response.data.result);
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [history, setHistory] = useState([])
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    getMyData(token).then(result => {
      setUser(result)
    }).catch(err => {
      console.log(err)
    })
    getTrans(token).then(result => {
      setHistory(result)
    }).catch(err => {
      console.log(err)
    })
    getAllUser(token).then(result => {
      setUsers(result)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  
  useEffect(() => {
    
  }, [history])


  return(
    <>
      <Layout>
        <Container fluid={true} className={`${styles.container}`}>
          <Row>
            <Col md="3" className={`d-flex justify-content-end py-lg-5 me-lg-3 `}>
              <Menu/>
            </Col>
            <Col xs="12" md="8" className={`d-flex flex-column justify-content-start align-items-center  ${styles.boxes}`}>
              <div className={`d-flex flex-column w-100 mb-3 ${styles.src}`}>
                <div className={styles.srctxtbox}>
                  <p className={styles.srctxt}>Search Receiver</p>
                </div>
                <form onSubmit={startSearch} className={`d-flex align-items-center px-3 ${styles.searchbox}`}>
                  <BsSearch onClick={startSearch} className={`${styles.iconSearch}`} />
                  <input className={`${styles.inputsrc}`} type="text" name="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search receiver here"/>
                </form>
              </div>
              <div className={styles.transbox}>
                {users.map((e, i) =>{
                  if(user.id !== e.id) {
                    return(
                      <div key={i} className={`d-flex mb-4 ${styles.carduser}`}
                      onClick={()=>Router.push(`/transfer/${e.id}`)} style={{cursor:'pointer'}}>
                        <img src={`${API_URL}uploads/${e.image}`} width="70px" height="70px" alt="" />
                        <div className={`d-flex flex-column ${styles.textbox}`}>
                          <h2>{`${e.firstname} ${e.lastname}`}</h2>
                          <p>{e.phone}</p>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Guard(Transfer);