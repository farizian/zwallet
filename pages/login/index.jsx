import { useState, useEffect } from "react";
import styles from '../../styles/Logsign.module.css'
import Image from 'next/dist/client/image'
import Router from 'next/router'
import Sign from '../../components/sign'
import axios from "axios";
const Login = () => {
  

    return(
      <>
        <div className="container-fluid" >
          <div className="row">
            <aside className={`col-lg-7 ${styles.asd}`}>
              <Image src="/Zwallet.png" onClick={()=>Router.push('/landingpage')} className={styles.zimg} alt="" width="102px" height="25px"/>
            </aside>
            <section className={`col-lg-5  ${styles.sec}`}>
              <Sign sign={"in"}/>
            </section>
          </div>
        </div>
      </>
    )
}

export default Login