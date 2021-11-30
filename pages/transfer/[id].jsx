/* eslint-disable @next/next/no-img-element */
import Router from 'next/router'
import Guard from '../../HOC/guard'
import Layout from '../../layout/default'
import {
  Container,
  Col,
  Row,
} from "reactstrap";
import { useState, useEffect } from 'react';
import styles from '../../styles/Trans.module.css';
import Image from 'next/image';
import Menu from '../../components/menu'
import axios from 'axios';
import CurrencyFormat from 'react-currency-format'
import { HiOutlinePencil } from "react-icons/hi";
import { API_URL } from '../../helpers/env';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));


const Transdetail = () => {
  const id = Router.query.id
  const props = {
    // className: ReactCodeInput,
    inputStyle: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "43px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "55px",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      margin: window.matchMedia("(max-width: 576px)").matches?"0px 5px":"0px 10px",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
    inputStyleInvalid: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "43px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "55px",
      backgroundColor: "white",
      color: "red",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
  };


  // show modal
  const [modal, setModal] = useState(false);

  // handle pin
  const [pin, setPin] = useState("");

  const [form, setForm] = useState({
    amount: "",
    description: "",
  });
  const [user, setUser] = useState({})
  const [myData, setMyData] = useState ({})
  const [dataInput, setDataInput] = useState({})
  const [errormsg, setErrorMsg] = useState();
  const setInput = (e) => {
    const { name, value } = e.target;

    if (value >= myData.balance) {
      setForm({
        ...form,
        amount: myData.balance,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleTf = (e) => {
    e.preventDefault();
    console.log(form);
  };

  // handle modal
  const toggle = () => {
    setErrorMsg("")
    setModal(!modal)
  };

  // handle pin
  const handleChangePin = (value) => {
    setPin(value);
  };

  const handlePin = (e) => {
    
    e.preventDefault();
    console.log(pin);
    if(pin === "" || pin.length < 6){
      setErrorMsg("please fill input")
    }else{
        e.preventDefault();
        const token = localStorage.getItem("token");
        const headers = {
            token
        }
        const formPin = {
            pin : pin
        }
        axios.post(`${API_URL}checkpin`, formPin, {headers})
        .then((response)=>{
          const formTrans = {
            amount : parseInt(form.amount),
            description: form.description
          }
          axios.post(`${API_URL}transfer/${id}`, formTrans, { headers })
          .then((response)=>{
            console.log(response.data.result.id)
              setModal(!modal);
              alert("Transfer Success")
              setErrorMsg("")
              Router.push(`/transfer/success`);
              localStorage.setItem('id', response.data.result.id)
          })
          .catch((error)=>{
              alert("Transfer Failed")
          })
        }).catch((error)=>{
          console.log(error.response.data)
          setErrorMsg("Wrong Pin")
        })
        
    }
  };


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
  
  const getuserDetail = () => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}user/${id}`)
      .then((response) => {
        resolve(response.data.result[0]);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    getMyData(token).then(result => {
      setMyData(result)
    }).catch(err => {
      console.log(err)
    })
    getuserDetail().then(result => {
      setUser(result)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return(
    <>
      <Layout>
        <Container fluid={true} className={`${styles.container}`}>
          <Row>
            <Col md="3" className={`d-lg-flex d-none justify-content-end py-lg-5 `}>
              <Menu/>
            </Col>
            <Col xs="12" md="9" className={`d-flex flex-column justify-content-end py-lg-5 ${styles.boxes2}`}>
              <div className={styles.transbox2}>
                <p>Transfer Money</p>
                <div className={`d-flex mb-4 ${styles.carduser}`}>
                  <img src={`${API_URL}uploads/${user.image}`} width="70px" height="70px" alt="" />
                  <div className={`d-flex flex-column ${styles.textbox}`}>
                    <h2>{`${user.firstname} ${user.lastname}`}</h2>
                    <p>{user.phone}</p>
                  </div>
                </div>
                <div className={`${styles.pbox}`}>
                  <p>Type the amount you want to transfer and then press continue to the next steps.</p>
                </div>
                <form className={`d-flex flex-column align-items-center justify-content-center ${styles.inputbox}`}>
                  <input type="number" className={styles.num} style={{ border:'none', fontSize:'42px', fontWeight:'700'}}
                  placeholder="0.00" name="amount" value={form.amount} onChange={setInput}/>
                  <p>
                    <CurrencyFormat className={styles.balance} value={myData.balance} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp.'}/> Available
                  </p>
                  <div className={styles.notebox}>
                    <Image src="/pen.png" alt="" width="20px" height="20px"/>
                    <input type="text" name="description" placeholder="Add some notes"  className={styles.notes} onChange={setInput}/>
                  </div>
                  <div className={`${styles.btnbox}`}>
                    <button onClick={toggle} type="button">Continue</button>
                  </div>
                </form>
              </div>
              <div className="position-absolute">
                <Modal
                  isOpen={modal}
                  toggle={toggle}
                  centered
                  className={`${styles.modalContent}`}
                >
                  <ModalHeader
                    className={`border-bottom-0 ${styles.modalHeader}`}
                    toggle={toggle}
                  >
                    Enter PIN to Transfer
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <small className={`${styles.noteModal}`}>
                        Enter your 6 digits PIN for confirmation to continue
                        transferring money.{" "}
                      </small>
                    </div>
                    <div className={`text-center my-5`}>
                      <ReactCodeInput
                        type="password"
                        secret
                        fields={6}
                        onChange={handleChangePin}
                        {...props}
                      />
                    </div>
                    <p style={{color:'red'}}>{errormsg}</p>
                  </ModalBody>
                  <ModalFooter className={`border-top-0`}>
                    <Button onClick={handlePin} className={`${styles.btnModal}`}>
                      Continue
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Guard(Transdetail)