import React from "react";
import "../css/navbar.css";
import Astronaut from "./Astronaut.jsx";

export default function Navbar() {
    return (
        <>
            <div class="bg-animation">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="stars4"></div>
            </div>
            <input type="radio" name="toggle" id="toggleOpen" value="toggleOpen" />
            <input type="radio" name="toggle" id="toggleClose" value="toggleClose" />
            <figure id="welcomeMessage">
                <figcaption>
                    <h1>
                        <label htmlFor="toggleOpen" title="Click to Open"></label>
                        <label htmlFor="toggleClose" title="Click to Close">✖</label>
                        <b>
                            G
                            <a href="javascript:void(0);" title="Home">
                            </a>
                        </b>
                        <b>
                            A
                            <a href="javascript:void(0);" title="Additional Information">
                            </a>
                        </b>
                        <b>
                            L
                            <a href="javascript:void(0);" title="Go To Shop">
                            </a>
                        </b>
                        <b>
                            A
                            <a href="javascript:void(0);" title="Send an Email">
                            </a>
                        </b>
                        <b>
                            X
                            <a href="javascript:void(0);" title="Facebook">
                            </a>
                        </b>
                        <b>
                            Y
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            g
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            u
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            i
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            d
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                        <b>
                            e
                            <a href="javascript:void(0);" title="Instagram">
                            </a>
                        </b>
                    </h1>
                </figcaption>
            </figure>
            <Astronaut text="Yoo whats up bro......." />
        </>
    );
}
