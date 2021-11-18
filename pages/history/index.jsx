/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/dashboard";
import styles from "../../styles/History.module.css";
import Image from "next/image";
// import profile from "../../public/profile.png";
import { API_URL } from '../../helpers/env';
import Guard from '../../HOC/guard';
import CurrencyFormat from 'react-currency-format'
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({})

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
      setHistory(result)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <Sidebar>
      <div className={`row ms-lg-4 ${styles.historyContent}`}>
        <div className={`px-lg-3 ${styles.titleHistory}`}>
          <div className={`row `}>
            <div className={`col-lg-8 col-6 d-lg-block d-flex align-items-center`}>
              <h5 className="">Transaction History</h5>
            </div>

            <div className={`col-lg-4 col-6 text-end`}>
              <button type="button" className={`btn ${styles.btnFilter}`}>
                --Select Filter--
              </button>
            </div>
          </div>
        </div>
        <div className={`d-flex flex-column ${styles.histrow}`}>
        {history.map((e, i) => (
          <div key={i} className={`row my-2`}>
            <div className="col-lg-9 col-7 p-0 px-lg-2">
              <div className="row">
                <div className="col-lg-2 col-5 d-lg-block d-flex justify-content-center">
                  <img
                    src={`${API_URL}uploads/${e.receiverUsers.image}`}
                    alt=""
                    className={`${styles.imageProfile}`}
                    width={62}
                    height={62}
                  />
                </div>

                <div className="col-lg-10 col-7 d-flex flex-column">
                  <span className={`${styles.nameProfileNav}`}>{`${e.receiverUsers.firstname} ${e.receiverUsers.lastname}`}</span>
                  <small className={`${styles.statusTrans}`}>{e.description}</small>
                </div>
              </div>
            </div>

            <div
              className={`col-lg-3 col-5 text-end pe-3 pt-2
                    ${
                      user.id === e.receiver
                        ? styles.colorGreen
                        : styles.colorRed
                    }
                    `}
            >
              <p>
                {e.receiver === user.id ? " + " : " - "}Rp. {e.amount}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Guard(History);
