/* eslint-disable @next/next/no-img-element */
import Layout from '../../layout/default'
import {
  Container,
  Col,
  Row,
} from "reactstrap";
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/dist/client/image';
import Menu from '../../components/menu'
import axios from 'axios';
import { API_URL } from '../../helpers/env';
import Guard from '../../HOC/guard';
import { useRouter } from 'next/router';
import down from '../../public/down.svg'
import up from '../../public/up.svg'
import CurrencyFormat from 'react-currency-format'
import { Bar } from 'react-chartjs-2';
import moment from 'moment'


const Home = () => {
  const [user, setUser] = useState({})
  const [history, setHistory] = useState([])
  const [income, setIncome] = useState("")
  const [spend, setSpend] = useState("")
  const [labels, setLabels] = useState([])
  const [total, setTotal] = useState([])
  

  const data = {
    labels: labels,
    datasets: [
        {
        label: '# of Votes',
        data: total,
        backgroundColor: [
          '#6379F4',
        ],

        borderWidth: 0.3,
        },
    ],
  };
    
  const options = {
      scales: {
          yAxes: [
          {
              ticks: {
              beginAtZero: true,
              },
          },
          ],
      },
  };
  const Router = useRouter()
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
  const getIncome = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}income`, {headers} )
      .then((response) => {
        resolve(response.data.result);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  const getSpend = (token) => {
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}spending`, {headers} )
      .then((response) => {
        resolve(response.data.result);
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
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    getMyData(token).then(result => {
      setUser(result)
    }).catch(err => {
      console.log(err)
    })
    getTrans(token).then(result => {
      var date = result.map((e) => moment(`${e.created_at}`).format("ddd"))
      setHistory(result)
      setTotal(result.map((e)=> e.amount))
      setLabels(date)
    }).catch(err => {
      console.log(err)
    })
    getIncome(token).then(result => {
      let join = result.reduce((a, e)=> a + e.amount,0)
      setIncome(join)
    }).catch(err => {
      console.log(err)
    })
    getSpend(token).then(result => {
      let join = result.reduce((a, e)=> a + e.amount,0)
      setSpend(join)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  
  useEffect(() => {
    
  }, [history])

  console.log(total)
  console.log(labels)

  return(
    <>
      <Layout>
        <Container fluid={true} className={`${styles.container}`}>
          <Row>
            <Col md="3" className={`d-lg-flex d-none justify-content-end py-5 `}>
              <Menu/>
            </Col>
            <Col sm="12" md="9" className={`d-flex flex-column justify-content-end py-lg-5`}>
              <div fluid={true} className={styles.saldobox}>
                <div className={`d-flex p-3 ${styles.col}`}>
                  <div className={`d-flex flex-column ${styles.txtbox}`}>
                    <p className={`${styles.txt1}`}>Balance</p>
                    <CurrencyFormat className={styles.balance} value={user.balance} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp. '}/>
                    <p className={`${styles.txt2}`}>+62 {user.phone}</p>
                  </div>
                </div>
                <div className={`p-lg-3 ${styles.col}`}>
                  <div className={`${styles.btnbox}`}>
                    <button className={`me-lg-0 me-2 ${styles.btn}`} onClick={()=>Router.push('/transfer')}>
                      <Image src="/arrowup.png" alt="" width="28px" height="28px"/>
                      <p>Transfer</p>
                    </button>
                    <button className={`${styles.btn}`} onClick={()=>Router.push('/topup')}>
                      <Image src="/plus.png" alt="" width="28px" height="28px"/>
                      <p>Top Up</p>
                    </button>
                  </div>
                </div>
              </div>
              <Row className={`pt-3 px-2`}>
                <Col md="7" className={`d-lg-block d-sm-none p-0`}>
                  <div className={`d-lg-flex d-none flex-column align-items-center justify-content-center ${styles.chart}`}>
                    <Row className="w-100">
                      <Col lg="6" xs="6" className="ps-5">
                        <Image src={down} alt="" />
                        <div>Income</div>
                        <CurrencyFormat className={`fs-20`} value={income} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp. '}/>
                      </Col>
                      <Col lg="6" xs="6" className="ps-5">
                        <Image src={up} alt="" />
                        <div>Expense</div>
                        <CurrencyFormat className={`fs-20`} value={spend} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp. '}/>
                      </Col>
                      <Col lg="12">
                        <Bar className="mt-4 pointer" data={data}  />
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md="5" xs="12" className={`p-0`}>
                <div className={styles.history}>
                  <div className={`d-flex ${styles.histhead}`}>
                    <h2>Transaction History</h2>
                    <p onClick={()=>Router.push("/history")} style={{cursor:'pointer'}}>See all</p>
                  </div>
                  <div className={`d-flex flex-column ${styles.boxcard}`}>
                  {history.map((e, i) => {
                    return(
                      <div key={i} className={`d-flex ${styles.card}`}>
                        <img src={`${API_URL}uploads/${e.receiverUsers.image}`} alt="" width="56px" height="56px"/>
                        <div className={`d-flex flex-column justify-content-center ${styles.textbox}`}>
                          <h2 style={{overflow:'hidden', textOverflow:'ellipsis'}}>{`${e.receiverUsers.firstname} ${e.receiverUsers.lastname}`}</h2>
                          <p>{e.description}</p>
                        </div>
                        <CurrencyFormat className={`d-flex align-items-center ${styles.amount}`} style={user.id === e.receiver?{color:'green'}:{color:'red'}} value={e.amount} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp.'}/>
                      </div>
                    )
                  })}
                  </div>
                </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Guard(Home)