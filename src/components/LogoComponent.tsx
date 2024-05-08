export const LogoComponent = () => {
  return (
    <div className="logo-grid-column">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 216"
        width="100%"
        className="item-grid-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="clip">
            <path
              d="M780,468h0a36,36,0,0,1-36,36H456a36,36,0,0,0-36,36v72a36,36,0,0,0,36,36h936a36,36,0,0,0,36-36h0a36,36,0,0,1,36-36h0a36,36,0,0,0,36-36V468a36,36,0,0,0-36-36H816A36,36,0,0,0,780,468Z"
              transform="translate(-420 -432)"
            />
          </clipPath>
        </defs>
        <image
          href="/img/minimal-923194_1920.jpg"
          width="1080"
          x="0"
          y="-744"
          clip-path="url(#clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>

      <div className="logo-grid-title unipaas-title">
        <h1>
          <a href="https://www.unipaas.com/" target="_blank">
            UNIPaaS
          </a>{" "}
          Web SDK
        </h1>
        <p>
          Integration Example by{" "}
          <a
            href="https://www.linkedin.com/in/mark-andrew-jft/"
            target="_blank"
          >
            Mark Andrew
          </a>
        </p>
      </div>
      <div className="logo-grid-bottom-right-corner"></div>
    </div>
  );
};
