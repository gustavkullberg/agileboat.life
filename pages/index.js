import Head from 'next/head'
import styles from '../styles/Home.module.css'
const url = `https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/118214714_1350905488436121_8665065078120554547_n.png?_nc_cat=109&_nc_sid=b96e70&_nc_ohc=d8k4qsZ9IIEAX-dfrzX&_nc_ht=scontent-arn2-1.xx&oh=844b27a2d693772787f1b3b805431843&oe=5F721717`

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Agilbåt</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Agilbåt.life
        </h1>
        <img className="boat" style={{marginTop:20}} src={url}/>
      </main>
    </div>
  )
}
