import styles from "../styles/Footer.module.css"
import { Container, Row, Col } from "reactstrap"
import Image from "next/dist/client/image";
import Router from 'next/router'

const Footer = ({data}) => {
  return (
    <>
    {data==='landing'?
    (
      <footer className={`${styles.footer}`}>
        <Container fluid={true} className={`pb-lg-3 ${styles.footerBottom} pt-5 text-white`}>
        <Image src="/Zwallet.png" onClick={()=>Router.push('/')} className={styles.footerLogo} alt="" width="102px" height="25px"/>
          <p className={`${styles.footerTagline} mb-5`}>Simplify financial needs and saving much time in banking needs with one single app.</p>
          <hr />
          <Row>
              <Col xs="12" md="6">
                <p className={styles.footerCopyright}>
                  2020 Zwallet. All right reserved.
                </p>        
              </Col>
              <Col xs="12" md="6">
                <div className={`d-flex ${styles.footerCopyright} justify-content-end`}>
                  <p className="me-5">+62 5637 8882 9901</p>
                  <p>contact@zwallet.com</p>
                </div>
              </Col>
          </Row>
        </Container>
      </footer>
    ):(
      <footer className={styles.footer}>
        <Container fluid={true} className={`pb-lg-3 ${styles.footerBottom} pt-5 text-white`}>
          <Row>
              <Col sm="12" md="6">
                <p className={`${styles.footerCopyright}`}>
                  2020 Zwallet. All right reserved.
                </p>        
              </Col>
              <Col sm="12" md="6">
                <div className={`d-flex ${styles.footerCopyright} justify-content-end`}>
                  <p className="me-5">+62 5637 8882 9901</p>
                  <p>contact@zwallet.com</p>
                </div>
              </Col>
          </Row>
        </Container>
      </footer>
    )}
    
    </>
  );
}

export default Footer