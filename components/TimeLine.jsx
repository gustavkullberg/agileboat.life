import styles from "../styles/TimeLine.module.css";

const imageArr = [
    { date: "2020-09-04", tn: "/boat-tn.jpg", image: "/boat.jpg" },
    {
        date: "2021-02-27",
        tn: "/boat-2021-02-27-1-tn.jpeg",
        image: "/boat-2021-02-27-1.jpeg",
    },
    {
        date: "2021-02-27",
        tn: "/boat-2021-02-27-2-tn.jpeg",
        image: "/boat-2021-02-27-2.jpeg",
    },
    {
        date: "2021-02-27",
        tn: "/boat-2021-02-27-3-tn.jpeg",
        image: "/boat-2021-02-27-3.jpeg",
    },
    {
        date: "2021-02-28",
        tn: "/boat-2021-02-28-1-tn.jpeg",
        image: "/boat-2021-02-28-1.jpeg",
    },
    {
        date: "2021-02-28",
        tn: "/boat-2021-02-28-2-tn.jpeg",
        image: "/boat-2021-02-28-2.jpeg",
    },
    {
        date: "2021-02-28",
        tn: "/boat-2021-02-28-3-tn.jpeg",
        image: "/boat-2021-02-28-3.jpeg",
    },
    {
        date: "2021-03-06",
        tn: "/boat-2021-03-06-1-tn.jpeg",
        image: "/boat-2021-03-06-1.jpeg",
    },
    {
        date: "2021-03-07",
        tn: "/boat-2021-03-07-1-tn.jpeg",
        image: "/boat-2021-03-07-1.jpeg",
    },
    {
        date: "2021-03-07",
        tn: "/boat-2021-03-07-2-tn.jpeg",
        image: "/boat-2021-03-07-2.jpeg",
    },
    {
        date: "2021-03-07",
        tn: "/boat-2021-03-07-3-tn.jpeg",
        image: "/boat-2021-03-07-3.jpeg",
    },
    {
        date: "2021-03-13",
        tn: "/boat-2021-03-13-1-tn.jpeg",
        image: "/boat-2021-03-13-1.jpeg",
    },
    {
        date: "2021-03-13",
        tn: "/boat-2021-03-13-2-tn.jpeg",
        image: "/boat-2021-03-13-2.jpeg",
    },
    {
        date: "2021-03-13",
        tn: "/boat-2021-03-13-3-tn.jpeg",
        image: "/boat-2021-03-13-3.jpeg",
    },
    {
        date: "2021-03-13",
        tn: "/boat-2021-03-13-4-tn.jpeg",
        image: "/boat-2021-03-13-4.jpeg",
    },
    {
        date: "2021-03-13",
        tn: "/boat-2021-03-13-5-tn.jpeg",
        image: "/boat-2021-03-13-5.jpeg",
    }
];

export const TimeLine = () => {
    const imagesByDate = imageArr.reduce((acc, curr) => {
        if (!acc[curr.date]) {
            acc[curr.date] = {
                images: [{
                    tn: curr.tn,
                    image: curr.image
                }]
            }
        } else {
            acc[curr.date].images.push({ tn: curr.tn, image: curr.image });
        }
        return acc;
    }, {})
    return (
        <div className={styles.timeline}>
            {Object.keys(imagesByDate).map((date, idx) => {
                return <div className={idx % 2 === 0 ? styles.container : styles.containerRight} >
                    <div className={styles.content}>
                        <h2>{new Date(date).toDateString()}</h2>
                        {imagesByDate[date].images.map(i => <img key={idx * Math.random()} className={styles.thumbnail} src={i.tn} />)}
                    </div>
                </div>
            })}
            {/*  <div className={styles.container} >
                <div className={styles.content}>
                    <h2>2016</h2>
                    <p>Lorem ipsum..</p>
                </div>
            </div>
            <div className={styles.containerRight} >
                <div className={styles.content}>
                    <h2>2017</h2>
                    <p>Lorem ipsum..</p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>2016</h2>
                    <p>Lorem ipsum..</p>
                </div>
            </div> */}
        </div>
    );
};
