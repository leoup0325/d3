import Logo from "../assets/image/logo.svg";

const Header = () => {
  return (
    <header className="px-lg-2 pt-4 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 left">
            <p className="wc tcm mb-2">
              <strong>COURSE</strong>
            </p>
            <h5>7-Day Leadership Challenge</h5>
            <h2 className="wc mt-3">Progress Report #1</h2>
          </div>
          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="logo">
              <img src={Logo} className="mx-auto mx-lg-0" alt="logo" />
            </div>
            <div className="info rounded mt-3">
              <p className="ffb">Name: name</p>
              <p className="ffb mt-1">Date: date</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
