import styles from "../styles/Home.module.css";

export default function ErrorPage({message}) {
 return <div className={styles.cardError}> <strong>Id do cliente Errado Ou Não Existe</strong> { message } </div>
 
}

