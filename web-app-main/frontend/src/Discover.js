import React, {Component} from 'react';
import './App.css';

class Discover extends Component {

	logout = () => {
		localStorage.clear();
		this.props.history.push("/");
		console.log("logout successful");
	}

    render() {
  return (
        <div className="Discover">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top">Vibe City</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Discover</a></li>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Artists</a></li>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#portfolio">Genres</a></li>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#" onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="shawn">
                <div className="container h-100">
                    <div className="row h-75 align-items-center justify-content-left text-left">
                        <div className="col-lg-10 align-self-end">
                            <h1 className="text-uppercase text-white font-weight-bold">amazing songs</h1>
                            <hr className="my-1"></hr>
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 font-weight-light mb-4">Explore new songs that aren't already in your playlists</p>
                            <a className="btns btns-spotify btn-xl js-scroll-trigger" href="#about">Explore</a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="page-section bg-dark" id="about">
                <div className="container">
                    <div className="row justify-content-center">

                    </div>
                </div>
            </section>

            <section className="page-section bg-dark text-white">
                <div className="container text-center">


                </div>
            </section>

            <footer className="bg-dark py-5">
                <div className="container"><div className="small text-center text-muted">Vibe City</div></div>
            </footer>
        </div>

        );
    }
}

export default Discover;
