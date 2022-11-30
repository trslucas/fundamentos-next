import { GetServerSideProps } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { SuccessContainer, SucessImageContainer } from "../styles/pages/sucess";


interface SucessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string,
    }
}

export default function Success({ customerName, product }: SucessProps) {
    return (
        <SuccessContainer>
            <h1>Compra Efetuada</h1>
            <SucessImageContainer>
                <Image src={product.imageUrl} alt="" height={110} width={120} />
            </SucessImageContainer>

            <p>
                Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está à caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name

    const product = session.line_items.data[0].price.product as Stripe.Product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}