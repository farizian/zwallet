/* eslint-disable @next/next/no-img-element */
import Dashboard from "../../layout/dashboard";
import styles from "../../styles/Transfer.module.css"
import { BsSearch, BsPencil } from "react-icons/bs";
import Image from "next/image"
import {useState, useEffect} from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormControl, FilledInput, InputAdornment, TextField } from "@mui/material";
import Guard from "../../HOC/guard";
import {API_URL} from "../../utils"
import axios from "axios"
import PinInput from "react-pin-input";
import CurrencyFormat from "react-currency-format";

const Transfer = () =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [id, setId] = useState()
    const [inputpin, setInputPin] = useState("");
    const [form, setForm] = useState({
        amount: "",
        note: "",
    })
   
    const [errormsg, setErrorMsg] = useState();
    const [data, setData] = useState([])
    const [user, setUser] = useState({})
    const getDataUsers = (token) =>{
        const headers = {
            token
        }
        axios.get(`${API_URL}/users`, {headers})
        .then((response)=>{
            setData(response.data.result)
            console.log(response.data.result)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const changeInput = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const changeInputPin = (value) => {
        setInputPin(value);
    };
    const handleTransfer = (e) =>{
        if(inputpin === "" || inputpin.length < 6){
            setErrorMsg("please fill input")
        }else{
            e.preventDefault();
            const token = localStorage.getItem("token");
            const headers = {
                token
            }
            const formPin = {
                pin : inputpin
            }
            axios.post(`${API_URL}/pin`, formPin, {headers})
            .then((response)=>{
                console.log(response)
                const formTransaction = {
                    amount : parseInt(form.amount),
                    note : form.note
                }
                axios.post(`${API_URL}/transfer/${id}`, formTransaction, { headers })
                .then((response)=>{
                    setModal(!modal);
                    alert("Transfer Success")
                    setErrorMsg("")
                    setId()
                })
                .catch((error)=>{
                    alert("Transfer Failed")
                })
            }).catch((error)=>{
                console.log(error.response.data)
                setErrorMsg("Wrong Pin")
            })
        }
    }
    const getUser = (token) =>{
        const headers = {
            token
        }
        axios.get(`${API_URL}/user`, {headers})
        .then((response)=>{
            setUser(response.data.result)
            console.log(response.data.result)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem("token")
        getDataUsers(token)
        getUser(token)
    },[])
    console.log(typeof inputpin)

    return(
        <Dashboard>
            <main className={`${styles.transfer}`}>
                <div className={`${styles.receiverForm} ${id !== undefined ? "d-none" : "d-block"}  w-100 p-3`}>
                    <h1 className={`${styles.titleReceiver} fontFamily`}>Search Receiver</h1>
                    <div className={`${styles.receiverSearch} p-2 d-flex mt-3`}>
                        <div className={`${styles.iconSearchBox}`}>
                            <BsSearch className={`${styles.iconSearch}`} />
                        </div>
                        <input type="" name="" value="" placeholder="search receiver here ..." className={`${styles.inputForm} ps-2`} />
                    </div>
                    <div className={styles.listContact} >
                        {data === undefined ? (
                            <p>Loading ...</p>
                        ):(
                            data.map((e,i)=>{
                                return(
                                    <div key={i} onClick={()=> setId(e.id)} className={`${styles.contact}  mt-4 w-100 shadow p-3 d-flex align-items-center`}>
                                        <div className={styles.profileContact}>
                                            <img className={styles.profileImage} src={`${API_URL}/${e.image}`} alt="contact Profile Picture" />
                                        </div>
                                        <div className='fontFamily ms-3'>
                                            <p className='mb-1 fw-bold text-capitalize'>{e.firstName}</p>
                                            <p>{e.phone}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                <div  className={`${styles.transferMoney} ${id === undefined ? "d-none" : "d-block"}  w-100 p-3` }>
                    <h1 className={`${styles.titleReceiver} fontFamily`}>Transfer Money</h1>
                    {id === undefined ? (
                        <p>Loading ...</p>
                    ):(
                        data.map((e,i)=>{
                            if(e.id === id){
                                return(
                                    <div key={i} className={`${styles.contact} mt-4 w-100 shadow p-3 d-flex align-items-center`}>
                                        <div className={styles.profileContact}>
                                            <img className={styles.profileImage} src={`${API_URL}/${e.image}`} alt="contact Profile Picture" />
                                        </div>
                                        <div className='fontFamily ms-3'>
                                            <p className='mb-1 fw-bold'>{e.firstName}</p>
                                            <p>{e.phone}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )}
                    <p className='fontFamily mt-3 mb-4 w-50'>Type the amount you want to transfer and then press continue to the next steps.</p>
                    <div className='d-flex align-items-center flex-column'>
                        <input className={`${styles.inputTransferAmount}`} type="number" placeholder="0.00" name="amount" value={form.amount} onChange={changeInput} />
                        <p className="mt-3 fontFamily">
                            <CurrencyFormat
                                value={user !== undefined ? (user.saldo) : null }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix="Rp "
                            />
                        </p>
                        <FormControl className="mt-3">
                            <FilledInput
                                placeholder='Enter Note'
                                className={`bg-white ps-2`}
                                name="note"
                                value={form.note}
                                onChange={changeInput}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BsPencil />
                                    </InputAdornment>
                                }
                            />
                            <button type="" onClick={toggle} className={`${styles.buttonAmount} fw-bold text-white fontFamily mt-3 btn`}>Continue</button>
                        </FormControl>
                        <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                            <ModalHeader toggle={toggle} className="fw-bold fontFamily">Enter Pin to Transfer</ModalHeader>
                            <ModalBody>
                                <p>Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                                <div className='mt-3 d-flex flex-column'>
                                    <PinInput
                                        length={6}
                                        focus
                                        secret
                                        // ref={p => (this.pin = p)}
                                        type="text"
                                        onChange={changeInputPin}
                                    />
                                    <br />
                                    <p className='text-danger text-capitalize fw-bold'>{errormsg}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={handleTransfer}>Transfer</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </main>

        </Dashboard>
    )
}
export default Guard(Transfer)