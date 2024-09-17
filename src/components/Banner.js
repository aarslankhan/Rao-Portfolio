import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Digital Transformation Specialist", "Seo Expert" ];
  /*const period = 2000;*/

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
  
    return () => { clearInterval(ticker) };
  }, [text, delta, isDeleting])

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
  
    if (isDeleting) {
      setDelta(200); // fixed animation speed
    } else {
      setDelta(300); // fixed animation speed
    }
  
    setText(updatedText);
  
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  })

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Zeeshan`} <span className="txt-rotate" dataPeriod="500" data-rotate='[ "Web Developer, "Digital Transformation Specialist", "SEO Expert" ]'><span className="wrap">{text}</span></span></h1>
                  <p>With 10 years of experience across Digital Marketing, SEO, Meta Ads, Google Ads, Graphic Design, Video Editing, Web Development, and Project Management, I specialize in driving business growth through data-driven strategies and creative solutions. My focus is on delivering high-impact, user-centric results that not only meet but exceed client expectations in today’s competitive digital landscape.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
