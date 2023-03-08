import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ products, bannerData }) {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
      console.log(user.photoURL);
    });
  }, []);
  return (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Men Kicks</h2>
      <button onClick={() => signOut(auth)} className="signout-button">sign out</button>
      <p>When you're a sneakerhead, you never stop collecting</p>
    </div>
 
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>
    
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
)};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

