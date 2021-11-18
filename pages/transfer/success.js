/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Guard from "../../HOC/guard"
import React, { useState, useEffect } from "react";
import styles from "../../styles/Success.module.css";
import Image from "next/image";
import { useRouter } from "next/router"
import Dashboard from "../../layout/dashboard";
import { Button } from "reactstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { BsGrid, BsPerson } from "react-icons/bs";
import { RiArrowUpLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineDownload } from "react-icons/ai";
import { FiLogOut, FiShare2 } from "react-icons/fi";
import axios from 'axios';
import { API_URL } from '../../helpers/env';
import CurrencyFormat from 'react-currency-format'
import moment from "moment-timezone";

const success = () => {
  const router = useRouter();
  const [history, setHistory] = useState({});
  const [receiver, setReceiverData] = useState({})
  const getTrans = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}mytrans/${id}`)
      .then((response) => {
        resolve(response.data.result[0]);
        console.log(response.data.result[0])
      }).catch((err) => {
        reject(err)
      })
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id');
    console.log(id)
    getTrans(id).then(result => {
      setHistory(result)
      setReceiverData(result.receiverUsers)
    }).catch(err => {
      console.log(err.response.data.error)
    })
  }, [])
  const home = () => {
    router.push('/home')
    localStorage.removeItem('id')
  }

  const datetime = (data) => {
    const dataTime = moment(`${data}`);
    return dataTime.tz("Asia/Jakarta").format("MMM DD, YYYY - HH.MM");
    // return moment(`${data}`).tz("Asia/Jakarta").format("MMM DD, YYYY - HH.MM");
  };
  return (
    <>
      <Dashboard>
        <div className={`row ${styles.successContent}`}>
          <div className={`col-lg-12 d-flex justify-content-center mt-3`}>
            <div className={`${styles.packHead}`}>
              <div className={` ${styles.titleSuccess}`}>
                <AiOutlineCheck size={32} />
              </div>
              <div className="mt-2">
                <small className={`${styles.noteSuccess}`}>
                  Transfer Success
                </small>
              </div>
            </div>
          </div>
          <div className={`d-flex flex-column ${styles.infobox}`}>
            <div className={`col-lg-12 ${styles.infoContent}`}>
              <div className={`row mb-3 ${styles.cardContact}`}>
                <div className="col-lg-9">
                  <div>
                    <p className={`${styles.titleCardInfo}`}>Amount</p>
                    <CurrencyFormat className={`${styles.bodyCardInfo}`}  value={history.amount} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp.'}/>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardContact}`}>
                <div className="col-lg-9">
                  <div>
                    <p className={`${styles.titleCardInfo}`}>
                      Balance left
                    </p>
                    <CurrencyFormat className={`${styles.bodyCardInfo}`}  value={history.balance} displayType={'text'} thousandSeparator={true} hunderedSeparator={true} prefix={'Rp.'}/>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardContact}`}>
                <div className="col-lg-9">
                  <div>
                    <p className={`${styles.titleCardInfo}`}>Date & Time</p>
                    <p className={`${styles.bodyCardInfo}`}>
                      {datetime(history.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardContact}`}>
                <div className="col-lg-9">
                  <div>
                    <p className={`${styles.titleCardInfo}`}>Notes</p>
                    <p className={`${styles.bodyCardInfo}`}>{history.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.titleTfto}`}>
              <p>Transfer to</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className={`row ${styles.cardContactReceiver}`}>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="col-lg-2 col-4">
                      <img
                        src={`${API_URL}uploads/${receiver.image}`}
                        alt=""
                        className={`${styles.imageProfileReceiver}`}
                        style={{width:'70px', height:'70px'}}
                      />
                    </div>
                    <div
                      className={`col-8 d-flex flex-column ${styles.infoReceiver}`}
                    >
                      <span
                        className={`text-capitalize ${styles.nameProfileNav}`}
                      >
                        {`${receiver.firstname} ${receiver.lastname}`}
                      </span>
                      <small className={`${styles.statusTrans}`}>
                        +62 {receiver.phone}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
            <Button
              className={`me-lg-3 ${styles.btnShare}`}
            >
              <FiShare2 size={28} />
            </Button>
            <Button
              className={`mx-lg-3 d-lg-block d-none ${styles.btnDwld}`}
            >
              <AiOutlineDownload size={28} className="me-3" />
              <small>Download PDF</small>
            </Button>
            <Button
              onClick={home}
              className={`ms-3 me-lg-5 ${styles.backToHome}`}
            >
              Back To Home
            </Button>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Guard(success);
