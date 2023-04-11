import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Topbar({ title, subTitle }) {
  return (
    <div className={styles.topbar}>
      <ul>
        <li>
          <Link href="/">
            <a>Início</a>
          </Link>
        </li>
      </ul>
      <div className={styles.titleContainer}>
        <h1><strong>{title}</strong></h1>
        <h2>{subTitle}</h2>
      </div>
      <div className={styles.login}>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button styles={{backgroundColor: "purple"}}>Entrar</button>
        
      </div>
      
     
      
    </div>
  );
}






