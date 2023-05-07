import React, { Fragment, useState } from "react";
import "./AboutUs.css";
import Footer from "../footer/Footer";

const About = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const toggleState = (index) => {
    setToggleTab(index);
  }
  return (
    <>  
    <div className="page-start">
    <Fragment>
      <section className="about">
        <div className="row">
          <div className="column">
            <div className="about-img"></div>
          </div>
          <div className="column">
            <div className="tabs">
              <div 
                className={ toggleTab === 1 ? "single-tab active-tab" : "single-tab" }
                onClick={() => toggleState(1)}
              >
                
                <h2>Our Story</h2>
              </div>

              <div className={toggleTab === 2 ? "single-tab active-tab" : "single-tab"}
                onClick={() => toggleState(2)}>
                <h2>How It All Started</h2>
              </div>

              <div className={toggleTab === 3 ? "single-tab active-tab" : "single-tab"}
                onClick={() => toggleState(3)}>
                <h2>Our Mission</h2>
              </div>
            </div>
            <div className="tab-content">
              <div className={toggleTab === 1 ? "content active-content" :"content"}>
                <h2>Our Story</h2>
                <p className="story-p">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus neque sapiente explicabo? Molestiae,
                  exercitationem. Quasi neque reprehenderit adipisci nemo amet
                  deleniti modi impedit ab sit recusandae, reiciendis placeat,
                  ipsam dolore?
                </p>

                <h3>Our Objective</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi nulla nemo dolorum illo consequatur numquam nihil
                  blanditiis quos id vel, rem voluptatibus exercitationem
                  sapiente, vero, voluptatum placeat itaque iste expedita.
                </p>
              </div>
              
               {/* How it started Content */}
               <div className={toggleTab === 2 ? "content active-content" :"content"}>
                <div className="exp-column">
                  <h2>How It All Started</h2>
                  <h3>Lorem.</h3>
                  <span>2014-2016</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Perspiciatis, atque?
                  </p>
                </div>

                <div className="exp-column">
                  <h3>Lorem, ipsum.</h3>
                  <span>2016-2018</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Perspiciatis, atque?
                  </p>
                </div>

                <div className="exp-column">
                  <h3>Lorem, ipsum dolor.</h3>
                  <span>2018-2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Perspiciatis, atque?
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className={toggleTab === 3 ? "content active-content" :"content"}>
                <h2>Our Mission</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus neque sapiente explicabo? Molestiae,
                  exercitationem. Quasi neque reprehenderit adipisci nemo amet
                  deleniti modi impedit ab sit recusandae, reiciendis placeat,
                  ipsam dolore?
                </p>

                <div className="skills-row">
               
                

                  

                
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </section>

    </Fragment>
    <Footer/>
    </div>
   </>

    );
};

export default About;