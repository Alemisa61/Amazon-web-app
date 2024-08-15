import React from 'react'
import { IoIosMenu } from "react-icons/io";
import classes from '../Header/Header.module.css'

export default function Loweheader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoIosMenu />
           <p>All</p>
        </li>
        <li> today's deals</li>
        <li>Custumer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}
