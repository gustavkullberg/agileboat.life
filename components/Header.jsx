import { useEffect, useState } from "react";

export const Header = () => {

  const [headerIsVisible, setHeaderIsVisible] = useState(true);



  useEffect(() => {
    window.addEventListener("scroll", () => {
      let ticking = false;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 25) {
            setHeaderIsVisible(setHeaderIsVisible(false))
          } else {
            setHeaderIsVisible(true)
          }
          ticking = false;
        });

        ticking = true;
      }
    });

  }, [])
  return (
    <div style={{ width: 300, top: 0 }}>
      <header>
        <h1>
          <a href="/">Agilbåt.life</a>
        </h1>

        <style jsx>
          {`
            header {
              width: 100%;
              height: 100px; 
              display: flex;
              justify-content: center;
              align-items: center;
            }

            header h1 {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            header a {
              padding-right: 10px;
              cursor: pointer;
              text-decoration: none;
              color: inherit;
            }
          `}
        </style>
      </header>
    </div>
  );
};
