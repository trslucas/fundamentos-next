import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/legacy/image'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    //const router = useRouter() => para rotas internas
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)


    async function handleBuyProduct() {
        try {

            setIsCreatingCheckoutSession(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            //para redirecionar para rota externa
            window.location.href = checkoutUrl

            //router.push('/checkout') => para rotas interna
        } catch (err) {

            setIsCreatingCheckoutSession(false)
            alert("Falha ao redirecionar ao checkout!")
        }

    }
    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={460} alt="" />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_MisZ1x6pfl7fzr' } }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount / 100),
                descpription: product.description,
                defaultPriceId: price.id

            }
        },
        revalidate: 60 * 60 * 1
    }
}