import React from 'react'
import styles from "./categorylist.module.css"
import Image from "next/image"
import Link from "next/link"

const getData = async () => { 
   const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store"
   });
   if(!res.ok){
      throw new Error("Failed")
   }

   return res.json();
};

const CategoryList = async () => {
   const data = await getData();
  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.heading}>Popular Categories!</h1>
      <div className={styles.categories}>
         {Array.isArray(data) && data.map(((item) => (
            <Link href={`/blogs?cat=${item.title}`} key={item._id} className={`${styles.category} ${styles[item.slug]}`}>
               {item.img && <Image src={item.img} alt="style-image" width={32} height={32} className={styles.image} />}
               {item.title}
            </Link>
         )))}
      </div>
    </div>
    </>
  )
}

export default CategoryList
