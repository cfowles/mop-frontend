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
          <a href='https://front.moveon.org/careers'>Careers</a>
          <a href='https://front.moveon.org/blog/'>News</a>
          <a href='https://www.facebook.com/moveon/videos'>Videos</a>
          <a href='https://act.moveon.org/signup/signup'>Sign Up for Emails</a>
          <a href='https://act.moveon.org/survey/get-texts-moveon/'>
            Sign up for Text Msg Alerts
          </a>
        </Nav.Links>
        <Nav.Links heading='Contact'>
          <a href='http://moveon.desk.com/customer/portal/emails/new'>
            General Inquiries
          </a>
          <Link to='/feedback.html'>Petition Inquiries</Link>
          <a href='https://act.moveon.org/survey/press/'>Press Inquiries</a>
          <Link to='/organizations.html'>Partner with Us</Link>
        </Nav.Links>
        <Nav.Links heading='Support'>
          <a href='https://front.moveon.org/frequently-asked-questions-and-contact-information-2/'>
            FAQs
          </a>
          <a href='https://front.moveon.org/privacy-policy/'>
            Privacy Policy and ToS
          </a>
        </Nav.Links>
        <Nav.CallToAction
          copy={
            <span>
              GET INVOLVED <br />
              Passionate about an issue?
            </span>
          }
        >
          <Link to='/create_start.html?source=petitionfooter'>
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
