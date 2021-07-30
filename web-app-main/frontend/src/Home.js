import React, {Component} from 'react';
import './App.css';

class Home extends Component {
    render() {
  return (
        <div className="Home">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top">Vibe City</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/register">Register</a></li>
                            <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead">
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-10 align-self-end">
                            <h1 className="text-uppercase text-white font-weight-bold">music recommendations for you based on your playlists</h1>
                            <hr className="divider my-4" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 font-weight-light mb-5">Vibe City is an application that allows you to discover new music based on music that you already listen to!</p>
                            <a className="btns btns-spotify btn-xl js-scroll-trigger" href="#about">Find Out More</a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="page-section bg-spotify" id="about">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">About Vibe City</h2>
                            <hr className="divider light my-4" />
                            <p className="text-white-50 mb-4">Tired of hearing the same songs and playlists everyday, but Spotify's music recommendations aren't to your liking? Then Vibe City is for you! Vibe City is a cross-platform application that uses cutting-edge machine learning to recommend songs based on the songs that are in your very own playlists! All user data is encrypted, so you will not need to worry about your accounts data being compromised. With Vibe City, you can link your Spotify account directly to the application and then you can listen, preview, and add songs to your Spotify playlists. What are you waiting for? Get started today!</p>
                            <a className="btns btns-light btn-xl js-scroll-trigger" href="/register">Register</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btns btns-light btn-xl js-scroll-trigger" href="/login">Login</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section bg-dark text-white">
                <div className="container text-center">
                    <h2 className="mb-4">Why Vibe City?</h2>
                    <hr className="divider my-4" />
                    <p className="text-white mb-4">Currently thinking of reason why...</p>

                </div>
            </section>

            <footer className="bg-dark py-5">
                <div className="container"><div className="small text-center text-muted">Vibe City</div></div>
            </footer>
        </div>

        );
    }
}

export default Home;
