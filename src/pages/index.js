import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Login from "../components/login/Login";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Seco</title>
        <link rel="icon" href="/iconMascarilla.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/SeCo.png" alt="SeCo"></img>
        <p className={styles.description}>Sistema de emergencia Covid (?)</p>
        <Login />
      </main>
    </div>
  );
}
