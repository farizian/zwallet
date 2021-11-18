import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Layout = (props) => {
  return(
    <div style={{backgroundColor:'#E5E5E5'}}>
      <Navbar data={"based"} />
      <main >{props.children}</main>
      <Footer data={"based"}/>
    </div>
  )
}

export default Layout