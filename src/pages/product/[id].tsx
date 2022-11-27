import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Product() {

    const { query } = useRouter()
    return (
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>
            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79,00</span>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi obcaecati accusamus neque voluptas explicabo itaque eius! Iure nobis assumenda fugiat veritatis voluptas illo ea exercitationem. Maxime eos mollitia quod consequuntur.</p>
                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    
    return {
        props: {

        },
        revalidate: 60 * 60 * 1
    }

}