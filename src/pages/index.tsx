import Image from "next/legacy/image"

import Link from "next/link"
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from "../styles/pages/home"
import { stripe } from "../lib/stripe"
<<<<<<< HEAD
import { GetServerSideProps } from "next"
=======
import { GetStaticProps } from "next"
>>>>>>> 3b94f79093dc47c0383e386c505a32d36a44916a

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
<<<<<<< HEAD
          <Link href={`/product/${product.id}`} key={product.id} >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>R$ {product.price}</span>
              </footer>
            </Product>
          </Link>
=======
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>

>>>>>>> 3b94f79093dc47c0383e386c505a32d36a44916a
        )
      })}
    </HomeContainer>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)


    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}