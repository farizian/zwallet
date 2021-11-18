import {
    Row,
    Col,
    Container
  } from "reactstrap";
import { useState } from "react";
import Link from 'next/link';
import style from '../styles/Signcomponent.module.css'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import Image from "next/dist/client/image";
import axios from "axios";
import Router from 'next/router'
import { API_URL } from '../helpers/env';
import PinInput from "react-pin-input";

const Sign = ({sign, id}) => {
  const [type, setType] = useState('password')
  // login
  const [errLogin, setErrLogin] = useState("")
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })
  
  const setDataLogin=(event)=>{
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value
    })
  }
  
  const submitLogin=(e)=>{
    e.preventDefault();
    console.log(userLogin)
    const valid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(userLogin.email)
    if(userLogin.email === "" || userLogin.password === ""){
      setErrLogin("input harus diisi.")
    } else if (!valid) {
      setErrLogin("input email tidak sesuai.")
    } else {
      return new Promise((resolve, reject)=>{
        axios.post(`${API_URL}login`, userLogin)
        .then((response)=>{
            resolve(response.data.result.user)
            console.log(response.data.result)
            localStorage.setItem('token', response.data.result.token)
            Router.push('/home')
        }).catch((err)=>{
          setErrLogin(err.response.data.error)
        })
      })
    }
  }
  // register
  const [errSign, setErrSign] = useState("")
  const [dataSignup, setDataSignup] = useState({
    firstname:"",
    lastname:"",
    phone:"",
    email:"",
    password:""
  })

  const insertData = (e) => {
    setDataSignup({ 
        ...dataSignup,
        [e.target.name]:e.target.value
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const valid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(dataSignup.email)
    if(
      dataSignup.firstname === "" ||
      dataSignup.lastname === "" ||
      dataSignup.phone === "" ||
      dataSignup.email === "" ||
      dataSignup.password === ""){
      setErrSign("input harus diisi.")
    } else if (!valid) {
      setErrSign("input email tidak sesuai.")
    } else {
      return new Promise((resolve, reject)=>{
        axios.post(`${API_URL}register`, dataSignup)
        .then((response)=>{
          resolve(response.data.result)
          localStorage.setItem('idsign', response.data.result.id)
          console.log(response.data.result.id)
          Router.push('/pin')
        }).catch((err)=>{
          setErrSign(err.response.data.error)
        })
      })
    }
  }

  // pin
  const [errPin, setErrPin] = useState("")
  const [pin, setPin] = useState("");
  const handlePin = (value) => {
    if(isNaN(value)) return false;
    setPin(value)
  }
  const submitPin=(e)=>{
    e.preventDefault();
    const pin = {
      pin: pin
    }
    console.log(pin.pin)
    if(pin.pin === ""){
      setErrPin("data harus diisi")
    } else {
      return new Promise((resolve, reject)=>{
        axios.put(`${API_URL}userpin/${id}`, pin)
        .then((response)=>{
          resolve(response.data.result)
          console.log(response.data.result)
          Router.push('/login')
        }).catch((err)=>{
          setErrPin(err.response.data.error)
        })
      })
    }
  }
    return(
        <Container fluid={true} style={{padding:'0'}}>  
        <Row className={style.register}>
          <Col lg="12" sm="12" className={style.Main} >
          {sign==="up"?
          <div className={style.bungkus}>
              <div className={style.ket}>
                <h1>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
                  <div>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
              </div>
              <form onSubmit={handleRegister} className={style.formSign}>
                <div className={style.inputbox}>
                  <Image src="/Vector.png" width="16px" height="16px" alt="" srcset="" />
                  <input
                  type="text"
                  name="firstname"
                  onChange={insertData}
                  placeholder="Enter your firstname"
                  />
                </div>
                <div className={style.inputbox}>
                  <Image src="/Vector.png" width="16px" height="16px" alt="" srcset="" />
                  <input
                  type="text"
                  name="lastname"
                  onChange={insertData}
                  placeholder="Enter your lastname"
                  />
                </div>
                <div className={style.inputbox}>
                  <Image src="/Vector.png" width="16px" height="16px" alt="" srcset="" />
                  <input
                  type="number"
                  name="phone"
                  onChange={insertData}
                  placeholder="Enter your phone"
                  />
                </div>
                <div className={style.inputbox}>
                  <Image src="/mail.png" width="16px" height="16px" alt="" srcset="" />
                  <input
                  type="email"
                  name="email"
                  onChange={insertData}
                  placeholder="Enter your e-mail"
                  />
                </div>
                <div className={style.inputbox}>
                  <Image src="/lock.png" width="16px" height="16px" alt="" srcset="" />
                  <input
                  type={type}
                  name="password"
                  onChange={insertData}
                  placeholder="Create your password"
                  />
                  {type==='password'? <AiOutlineEyeInvisible onClick={()=>setType('text')} color="#A9A9A9" style={{width:'17px', height:'17px'}}/> : <AiOutlineEye onClick={()=>setType('password')} color="#A9A9A9" style={{width:'17px', height:'17px'}}/> }
                </div>
                <p style={{color:'red'}}>{errSign}</p>
                <button type="submit">Sign Up</button>
                <div className={style.info}>Already have an account? Let’s&nbsp;<Link  href="/login">Login</Link></div>
              </form>
          </div>
          : sign==="in" ?
          <div className={style.bungkus}>
            <div className={style.ket}>
              <h1>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
                <div>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
            </div>
            <form onSubmit={submitLogin} className={style.formSign}>
              <div className={style.inputbox} style={{borderBottom:'1.5px solid #A9A9A999'}}>
                <Image src="/mail.png" width="16px" height="16px" alt="" srcset="" />
                <input
                type="email"
                name="email"
                onChange={setDataLogin}
                placeholder="Enter your e-mail"
                />
              </div>
              <div className={style.inputbox} style={{borderBottom:'1.5px solid #A9A9A999'}}>
                <Image src="/lock.png" width="16px" height="16px" alt="" srcset="" />
                <input
                type={type}
                name="password"
                onChange={setDataLogin}
                placeholder="Enter your password"
                />
                {type==='password'? <AiOutlineEyeInvisible onClick={()=>setType('text')} color="#A9A9A9" style={{width:'17px', height:'17px'}}/> : <AiOutlineEye onClick={()=>setType('password')} color="#A9A9A9" style={{width:'17px', height:'17px'}}/> }
              </div>
              <p style={{color:'red'}}>{errLogin}</p>
              <div className={style.forgot}>
                <p>Forgot password?</p>
              </div>
              <button type="submit">Login</button>
              <div className={style.info}>Don’t have an account? Let’s&nbsp;<Link href="/signup" style={{textDecoration:'none'}}> Sign Up</Link></div>
            </form>
          </div>
          :
          <div className={style.bungkus}>
            <div className={style.ket}>
              <h1>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h1>
                <div>Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</div>
            </div>
            <form onSubmit={submitPin} className={style.formSign}>
              <div className={style.inputpin}>
                
                  <PinInput
                    className={style.pinbox}
                    style={{fontSize:'30px'}}
                    inputStyle={window.matchMedia("(max-width: 576px)").matches?{borderColor: '#A9A9A999', height:'55px', width:'40px', borderRadius:'10px', marginInline: "5px"}:{borderColor: '#A9A9A999', height:'65px', width:'53px', borderRadius:'10px', marginInline: "5px"}}
                    inputFocusStyle={{borderColor: '#A9A9A999'}}
                    length={6}
                    focus
                    secret
                    type="text"
                    onChange={handlePin}
                  />
                
              </div>
              <p style={{color:'red'}}>{errPin}</p>
              {/* <p> hasil {pin}</p> */}
              <button type="submit" style={pin.length>0?{backgroundColor:"#6379F4", color:'white'}:{backgroundColor:"#DADADA", color:'#88888F'}}>Confirm</button>
            </form>
          </div>}
          </Col>
        </Row>
     </Container>
    )
}

export default Sign