import Image from "next/legacy/image";
import Link from "next/link";
import { ImageContainer } from "../styles/pages/product";
import { SuccessContainer } from "../styles/pages/sucess";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra Efetuada</h1>
            <ImageContainer>

            </ImageContainer>

            <p>
                Uhuul <strong>Lucas Trindade</strong>, sua <strong>Camiseta Beyound the Limits</strong> já está à caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}