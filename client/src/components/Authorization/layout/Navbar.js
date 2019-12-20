import React from 'react'
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Navbar2() {
    return (
        <Container>
        <nav>
                   <div>
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons"><i class="large material-icons" >arrow_back</i></i>
              <a href="#!" class="brand-logo center"><div class="shadow-lg p-3 mb-5 bg-white rounded">
                   <p class="text-xl-center"><h1 style={{color:'grey'}}>ONSITE MASTER v1.0</h1></p></div></a>
            </Link>
          </div>

        </nav>
      
        </Container>
    )
}
