
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import classes from '../Header/Header.module.css'
import Loweheader from "./Loweheader";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import {authentication} from "../../Utility/Firebase"



export default function Header() {
 const [state] =useContext(DataContext)
 const {basket,user} = state
 const totalItem = basket?.reduce((alemisa,ararsa) =>{
  return ararsa.amount + alemisa
 },0)
  
 
  console.log(basket)
  return (
    <section className={classes.fixed}>
      <section>
        <section>
          <div className={classes.Header_Container}>
            <div className={classes.logo_container}>
              {/* logo */}
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
              <div className={classes.delivery}>
                <span>
                  <IoLocationOutline />
                </span>
                <div>
                  <p>delivered to </p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            <div className={classes.search}>
              {/* Search  bar*/}
              <select name="mySelector" id="mySelector">
                <option value="" selected>
                  All
                </option>
              </select>
              <input
                type="text"
                name=" "
                id=""
                placeholder="search holder"
              ></input>
              <FaSearch size={25} />
            </div>
            <div>
              {/* right hand side  */}
              <div className={classes.Order_container}>
                <Link to="/" className={classes.language}>
                  <img
                    src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
                    alt="usa flag"
                  />
                  <select className={classes.language_Selector}>
                    <option value="en" selected>
                      EN
                    </option>
                  </select>
                </Link>
                {/* three components */}

                <Link to={!user && "/signup"}>
                  <>
                    <div>
                      {user ? (
                        <>
                          <p>Hello {user.email.split("@")[0]}</p>
                          <span onClick={() => authentication.signOut()}>Sign out</span>
                        </>
                      ) : (
                        <p>Sign in</p>
                      )}
                    </div>
                    <div>
                      <span>Account &amp; list</span>
                    </div>
                  </>
                </Link>

                <Link to="/orders">
                  <p>returns</p>
                  <span>&Orders</span>
                </Link>
                {/* Cart */}
                <Link to="/cart" className={classes.cart}>
                  <CgShoppingCart />
                  <span>{totalItem}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Loweheader />
    </section>
  );
}
