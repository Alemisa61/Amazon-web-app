import React from "react";
import CategoryComponent from "./CategoryComponent";
import { ImageCategory } from "../Category/CategoryJson";
import classes from '../Category/Category.module.css'

export default function Parentcom() {
  return (
    <section className= {classes.parent}>
      {ImageCategory.map((image) => (
        <CategoryComponent {...image} key={image.name} />
      ))}
    </section>
  );
}
