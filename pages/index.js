import Link from "next/link";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="nba,franchise,teams"></meta>
        <meta name="description" content="encontre tudo de nba aqui"></meta>
      </Head>
      <h1>Omni Tools</h1>
      <br />
      <Link href="/orderwaiting">
        <a>Pedidos Em Espera</a>
      </Link>
      <br />
      <Link href="/reservations">
        <a>Reservas Em Aberto</a>
      </Link>
      <br />
      <Link href="/quotation">
        <a>Verificar Cotação</a>
      </Link>
      <br />
    </div>
  );
}
