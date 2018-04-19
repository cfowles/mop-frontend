import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import {
  Nav,
  Logo,
  Text as FooterText,
  Social,
  PACFinePrint,
  MoFooter
} from 'GiraffeUI/footer'

import CaretRightSvg from 'GiraffeUI/svgs/caret-right.svg'
import DocumentSvg from 'GiraffeUI/svgs/document-add.svg'

export const Footer = ({ entity }) => (
  <MoFooter>
    <Logo />
    <MoFooter.Top>
      <Nav>
        <Nav.Links heading='Organization'>
          <Link to='https://front.moveon.org/careers'>Careers</Link>
          <Link to='https://front.moveon.org/blog/'>News</Link>
          <Link to='https://www.facebook.com/moveon/videos'>Videos</Link>
          <Link to='https://act.moveon.org/signup/signup'>
            Sign Up for Emails
          </Link>
          <Link to='https://act.moveon.org/survey/get-texts-moveon/'>
            Sign up for Text Msg Alerts
          </Link>
        </Nav.Links>
        <Nav.Links heading='Contact'>
          <Link to='http://moveon.desk.com/customer/portal/emails/new'>
            General Inquiries
          </Link>
          <Link to='/feedback.html'>Petition Inquiries</Link>
          <Link to='https://act.moveon.org/survey/press/'>Press Inquiries</Link>
          <Link to='/organizations.html'>Partner with Us</Link>
        </Nav.Links>
        <Nav.Links heading='Support'>
          <Link to='https://front.moveon.org/frequently-asked-questions-and-contact-information-2/'>
            FAQs
          </Link>
          <Link to='https://front.moveon.org/privacy-policy/'>
            Privacy Policy and ToS
          </Link>
        </Nav.Links>
        <Nav.CallToAction
          copy={
            <span>
              GET INVOLVED <br />
              Passionate about an issue?
            </span>
          }
        >
          <Link to='http://petitions.moveon.org/create_start.html?source=homepage'>
            <DocumentSvg />
            Start A Petition
            <CaretRightSvg />
          </Link>
        </Nav.CallToAction>
      </Nav>

      <FooterText />
    </MoFooter.Top>
    <MoFooter.Bottom>
      <Social />
      {entity === 'pac' && <PACFinePrint />}
    </MoFooter.Bottom>
  </MoFooter>
)

Footer.propTypes = {
  entity: PropTypes.string
}

export default Footer
