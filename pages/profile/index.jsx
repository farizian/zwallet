/* eslint-disable @next/next/no-img-element */
import Guard from "../../HOC/guard"
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "../../layout/dashboard";
import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({})
  const [img, setImg] = useState({})
  const updateImg = (data) => {
    const token = localStorage.getItem('token')
    const headers = {
      token: token
    }
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}user`, data, {headers} )
      .then((response) => {
        console.log(response.data.message)
        resolve(response.data.message);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  const handleImg = (e) => {
    setImg({
      ...img,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0])
    });
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    updateImg(formData)
  }
  const hiddenFileInput = useRef(null);
  const handleClickImg = (e) => {
    hiddenFileInput.current.click();
  };
  const logout = () => {
    localStorage.clear();
    router.push('/')
    // window.location.reload()
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
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    getMyData(token).then(result => {
      setUser(result)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <Dashboard>
      <div className={`row pb-5 ${styles.historyContent}`}>
        <div className={`col-lg-12 mt-5 `}>
          <div className="row ">
            <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
              <img
                src={img.imagePreview ? img.imagePreview : `${API_URL}uploads/${user.image}`}
                alt="profile"
                className={`${styles.imageProfile}`}
                width={80}
                height={80}
              />
              <div className={`${styles.packEditImg}`}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImg}
                  ref={hiddenFileInput}
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={handleClickImg}
                  className={`btn ${styles.btnEdit}`}
                >
                  <HiOutlinePencil size={18} className="me-1" />
                  Edit
                </button>
              </div>
            </div>

            <div className="col-lg-12 mt-lg-3 d-flex flex-column justify-content-center align-items-center">
              <span className={`${styles.nameProfileNav}`}>{user.firstname+" "+user.lastname}</span>
              <small className={` mt-lg-2 ${styles.statusTrans}`}>
                {`+62${user.phone}`}
              </small>
            </div>

            <div className={`col-lg-12 ${styles.infoContent}`}>
              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 col-9 text-start">
                  <p className={`${styles.noProced}`}>Personal Profile</p>
                </div>
                <div className="col-lg-2 col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 col-9 text-start">
                  <p className={`${styles.noProced}`}>Change Password</p>
                </div>
                <div className="col-lg-2 col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 col-9 text-start">
                  <p className={`${styles.noProced}`}>Change PIN</p>
                </div>
                <div className="col-lg-2 col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={logout}
                className={`row mb-3 ${styles.cardProfile}`}
              >
                <div className="col-lg-9 text-start">
                  <p className={`${styles.noProced}`}>Log Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Guard(Profile);
