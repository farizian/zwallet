import '../components/css/Register.css'
import {
    Row,
    Col,
    Container
} from "reactstrap";
import logo from '../images/logo.svg'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ACTION_GET_DETAILS2_USER, UPDATE_USER } from "../redux/action/users";

const Register = () => {

    const history = useHistory()
    const user = useSelector(store => store.user)
    const [error, setError] = useState("")
    const location = useLocation()
    const dispatch = useDispatch()
    const [form, setFrom] = useState({
        name: "",
        email : "",
        password: "",
        image: "",
        no_telp : "",
        status: "",
        confirm: ""
    })
    const query = new URLSearchParams(location.search)
    const id = query.get("id")
    const token = query.get("token")

    const getDataUser = () =>{
        dispatch(ACTION_GET_DETAILS2_USER(id));
    }
    const changeInput = (e) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(()=>{
        getDataUser()
        localStorage.setItem("token", token);   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        setFrom({
            name : user.details2.name,
            email: user.details2.email,
            no_telp: user.details2.no_telp,
            image: user.details2.image,
            status: user.details2.status
        });
    },[user.details2])

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(form)
        // eslint-disable-next-line no-mixed-operators
        if(form.confirm === undefined && form.password === undefined || form.confirm === "" && form.password === "" ){
            setError("Please fill out this field")
        }else if(form.confirm !== form.password){
            setError("The password confirmation does not match")
            setFrom({
                ...form,
                password : "",
                confirm: ""
            })
        }else{
            console.log(form)
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("no_telp", form.no_telp);
            formData.append("image", form.image);
            formData.append("status", form.status);
            UPDATE_USER(id,formData)
            .then((res)=>{
                alert("Reset Password Success, Silahkan Login Kembali")
                history.push("/login")
                // localStorage.removeItem("token")
                setError("")
            }).catch((err)=>{
                alert("Cannot Reset Password")
            })
            
        }
        
        
    }

    return(
        <Container fluid={true}>  
        <Row className="register">
            <div className="bungkusBg" >
                <div className="BgRegister" >
                <img className="logo" src={logo} alt=""/>
                <div className="ketBgRegis">Temukan developer berbakat & terbaik di berbagai bidang keahlian</div>
                </div>
            </div>
            <Col  className="Main-Register" > 
                <div className="bungkus"> 
                    <div className="ket-register">
                        <h1>Reset password</h1>
                        <div>
                        You need to change your password to activate your account
                        </div>       
                    </div>        
                    {user.loadDetails === true ? (
                        <h1>Loading ...</h1>
                    ):(
                        <form className="formRegister" onSubmit={handleSubmit}>
                            <label>Kata sandi</label>
                            <input
                            type="password"
                            placeholder="Masukan kata sandi"
                            name= "password"
                            onChange={changeInput}
                            value={form.password}
                            />
                    
                            <label>Confirmation new password</label>
                            <input
                            type="password"
                            placeholder="Masukan konfirmasi kata sandi"
                            name= "confirm"
                            onChange={changeInput}
                            value={form.confirm}
                            />
                            <p className="text-danger">{error}</p>
                            <button type="submit">Reset password</button>  
                        </form>
                    )}
                    <div className="info">Anda sudah punya akun? <Link to="/login/0">Masuk disini</Link></div>
                </div>
            </Col>
        </Row>
     </Container>
    )
}

export default Register
