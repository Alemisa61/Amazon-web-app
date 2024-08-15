

import React from 'react';
import classes from '../Category/Category.module.css'
import { Link } from "react-router-dom";

export default function CategoryComponent(props) {
  const {title,name,imageLink } = props;

  return (
    <div className={classes.Category}>
      <Link to={`/category/${name}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={imageLink} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  );
}