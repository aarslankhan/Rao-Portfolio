import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import axios from 'axios';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (responseStatus === 'success') clearFields();
  }, [responseStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && email.indexOf("@") > -1) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://raozeeshanaltaf.clickflow.tech/api/subscribe';
        const response = await axios.post(apiUrl, { email });
        setResponseStatus(response.data.status);
        setResponseMessage(response.data.message);
      } catch (error) {
        setResponseStatus('error');
        setResponseMessage('Subscription failed. Please try again.');
      }
    } else {
      setResponseStatus('error');
      setResponseMessage('Invalid email address.');
    }
  };

  const clearFields = () => {
    setEmail('');
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br />& Never miss latest updates</h3>
            {responseStatus === 'sending' && <Alert>Sending...</Alert>}
            {responseStatus === 'error' && <Alert variant="danger">{responseMessage}</Alert>}
            {responseStatus === 'success' && <Alert variant="success">{responseMessage}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};