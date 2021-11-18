/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/dist/client/image"
import styles from "../styles/Menu.module.css"
import { useRouter } from "next/router";
import { MdOutlineWindow, MdLogout } from 'react-icons/md'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";

const menu = () => {
  const Router = useRouter();
  const logout = () => {
    localStorage.clear();
    Router.push('/')
  }
  
  return(
    <>
    <div className={`${styles.menubox}`}>
      <div className={`d-flex flex-column ${styles.menu1}`}>
        <div className={`d-flex ps-4 ${Router.pathname === "/home"? styles.linkActive : styles.menu}`} onClick={()=>Router.push('/home')} >
          <MdOutlineWindow className={styles.menuIcon}/>
          <p className={styles.txt}>Dashboard</p>
        </div>
        <div className={`d-flex ps-4 ${Router.pathname === "/transfer" ? styles.linkActive2 : styles.menu}`} onClick={()=>Router.push('/transfer')} >
          <AiOutlineArrowUp className={styles.menuIcon} />
          <p className={styles.txt}>Transfer</p>
        </div>
        <div className={`d-flex ps-4 ${Router.pathname === "/topup" ? styles.linkActive : styles.menu}`} onClick={()=>Router.push('/topup')}>
          <AiOutlinePlus className={styles.menuIcon} />
          <p className={styles.txt}>Top Up</p>
        </div>
        <div className={`d-flex ps-4 ${Router.pathname === "/profile" ? styles.linkActive : styles.menu}`} onClick={()=>Router.push('/profile')}>
          <AiOutlineUser className={styles.menuIcon} />
          <p className={styles.txt}>Profile</p>
        </div>
      </div>
      <div className={`d-flex flex-column justify-content-end ${styles.menu2}`} >
        <div className={`d-flex ps-4 ${Router.pathname === "#" ? styles.linkActive : styles.menu}`} style={{marginBottom:'0'}} onClick={logout}>
          <MdLogout className={styles.menuIcon} />
          <p className={styles.txt}>Logout</p>
        </div>
      </div>
    </div>
  </>
  )
}
export default menu