// import { useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import Register from '../components/register'
// import RegisterPekerja from '../components/RegisterPekerja'
// import { REGISTER } from '../redux/action/users'
import styles from '../../styles/Logsign.module.css'
import Image from 'next/dist/client/image'
import Router from 'next/router'
import Sign from '../../components/sign'
const Registers = () => {
 

    return(
      <>
        <div className="container-fluid" >
          <div className="row">
            <aside className={`col-lg-7 ${styles.asd}`}>
              <Image src="/Zwallet.png" onClick={()=>Router.push('/landingpage')} className={styles.zimg} alt="" width="102px" height="25px"/>
            </aside>
            <section className={`col-lg-5  ${styles.sec}`}>
              <Sign sign={"up"}/>
            </section>
          </div>
        </div>
      </>
    )
}

export default Registers