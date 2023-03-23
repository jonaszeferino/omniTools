import Link from "next/link";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <div style={{ margin: "auto" }}>
        <Head>
          <title>Home</title>
          <meta name="keywords" content=""></meta>
          <meta name="description" content=""></meta>
        </Head>
        <h1>Omni Tools</h1>
        <br />
        <Link href="/orderwaitinggraphic">
          <a>Pedidos Em Espera</a>
        </Link>
        <br />
        <Link href="/reservations">
          <a>Reservas Em Aberto</a>
        </Link>
        <br />
        <Link href="/quotation">
          <a>Como funciona a Cotação</a>
        </Link>
        <br />
      </div>
    </div>
  );
}
