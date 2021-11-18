import Guard from "../../HOC/guard"
import Dashboard from '../../layout/dashboard'
import styles from "../../styles/Topup.module.css"
import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { API_URL } from "../../helpers/env";
import PinInput from "react-pin-input";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));

const Topup = () =>{
  const router = useRouter()
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputpin, setInputPin] = useState("");
  const [errormsg, setErrorMsg] = useState();
  const [form, setForm] = useState({
    amount: "",
  });
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
      margin: "0px 10px",
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

  const changeInput = (e) => {
    setForm({
    ...form,
    [e.target.name]: e.target.value,
    });
  };
  const changeInputPin = (value) => {
    setInputPin(value);
  };
  const handleTopup = (e) =>{
    console.log(inputpin)
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
      axios.post(`${API_URL}checkpin`, formPin, {headers})
      .then((response)=>{
        // console.log(response)
        const formTopUp = {
          amount : parseInt(form.amount),
          description: "Topup Zwallet"
        }
        // console.log(typeof formTopUp.amount)
        axios.post(`${API_URL}topup`, formTopUp, { headers })
        .then((response)=>{
          setModal(!modal);
          alert("Top Up Success")
          router.push('/home');
          setErrorMsg("")
        })
        .catch((error)=>{
          alert("Top up Failed")
        })
      }).catch((error)=>{
        console.log(error.response.data)
        setErrorMsg("Wrong Pin")
      })
    }
  }
  return(
    <Dashboard className={styles.layout}>
      <main className={`${styles.formBorder} shadow p-5`}>
        <h1 className={`${styles.titleTopup} fontFamily`}>Top Up</h1>
        <div className='d-flex mt-5 flex-column align-items-center'>
          <label className={`${styles.titleTopup} fontFamily mb-2`}>Amount</label>
          <input type="number" className={styles.inputTopup} style={{ border:'none', fontSize:'42px', fontWeight:'700'}}
          placeholder="0.00" name="amount" value={form.amount} onChange={changeInput}/>
          <button onClick={toggle} type="" className={`${styles.buttonTopup} mt-4 btn fw-bold text-white fontFamily`}>Send</button>
        </div>
        <div className={`position-absolute`}>
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
                  onChange={changeInputPin}
                  {...props}
                />
              </div>
              <p style={{color:'red'}}>{errormsg}</p>
            </ModalBody>
            <ModalFooter className={`border-top-0`}>
              <Button onClick={handleTopup} className={`${styles.btnModal}`}>
                Continue
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </main>
    </Dashboard>
  )
}
export default Guard(Topup)