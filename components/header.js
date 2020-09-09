export const Header = () => {
  return (
    <div style={{ width: 300 }}>
      <header>
        <h1 target="_blank" rel="noopener noreferrer">
          <a href="/">Agilbåt.life</a>
        </h1>

        <style jsx>
          {`
            header {
              width: 100%;
              height: 100px;
              border-bottom: 1px solid #eaeaea;
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
