import React from 'react'
import PropTypes from 'prop-types'

const CountrySelect = ({value, onChange}) => (
  <select
    name="country"
    className="span4 country_select moveon-track-click"
    value={value}
    onChange={onChange}
  >
    <option>United States</option>
    <option>Afghanistan</option>
    <option>Albania</option>
    <option>Algeria</option>
    <option>American Samoa</option>
    <option>Andorra</option>
    <option>Angola</option>
    <option>Anguilla</option>
    <option>Antigua and Barbuda</option>
    <option>Argentina</option>
    <option>Armenia</option>
    <option>Aruba</option>
    <option>Australia</option>
    <option>Austria</option>
    <option>Azerbaijan</option>
    <option>Bahamas</option>
    <option>Bahrain</option>
    <option>Bangladesh</option>
    <option>Barbados</option>
    <option>Belarus</option>
    <option>Belgium</option>
    <option>Belize</option>
    <option>Benin</option>
    <option>Bermuda</option>
    <option>Bhutan</option>
    <option>Bolivia</option>
    <option>Bosnia and Herzegovina</option>
    <option>Botswana</option>
    <option>Brazil</option>
    <option>British Virgin Islands</option>
    <option>Brunei</option>
    <option>Bulgaria</option>
    <option>Burkina Faso</option>
    <option>Burundi</option>
    <option>Cambodia</option>
    <option>Cameroon</option>
    <option>Canada</option>
    <option>Cape Verde</option>
    <option>Cayman Islands</option>
    <option>Central African Republic</option>
    <option>Chad</option>
    <option>Chile</option>
    <option>China</option>
    <option>Colombia</option>
    <option>Comoros</option>
    <option>Congo, DPR</option>
    <option>Congo, PR</option>
    <option>Cook Islands</option>
    <option>Costa Rica</option>
    <option>C&ocirc;te d&#8217;Ivoire</option>
    <option>Croatia</option>
    <option>Cuba</option>
    <option>Cyprus</option>
    <option>Czech Republic</option>
    <option>Denmark</option>
    <option>Djibouti</option>
    <option>Dominica</option>
    <option>Dominican Republic</option>
    <option>East Timor</option>
    <option>Ecuador</option>
    <option>Egypt</option>
    <option>El Salvador</option>
    <option>Equatorial Guinea</option>
    <option>Eritrea</option>
    <option>Estonia</option>
    <option>Ethiopia</option>
    <option>Falkland Islands</option>
    <option>Faroe Islands</option>
    <option>Fiji</option>
    <option>Finland</option>
    <option>France</option>
    <option>French Guiana</option>
    <option>French Polynesia</option>
    <option>Gabon</option>
    <option>Gambia</option>
    <option>Georgia</option>
    <option>Germany</option>
    <option>Ghana</option>
    <option>Gibraltar</option>
    <option>Greece</option>
    <option>Greenland</option>
    <option>Grenada</option>
    <option>Guadeloupe</option>
    <option>Guam</option>
    <option>Guatemala</option>
    <option>Guinea</option>
    <option>Guinea-Bissau</option>
    <option>Guyana</option>
    <option>Haiti</option>
    <option>Honduras</option>
    <option>Hong Kong</option>
    <option>Hungary</option>
    <option>Iceland</option>
    <option>India</option>
    <option>Indonesia</option>
    <option>Iran</option>
    <option>Iraq</option>
    <option>Ireland</option>
    <option>Israel</option>
    <option>Italy</option>
    <option>Jamaica</option>
    <option>Japan</option>
    <option>Jordan</option>
    <option>Kazakhstan</option>
    <option>Kenya</option>
    <option>Kiribati</option>
    <option>Kosovo</option>
    <option>Kuwait</option>
    <option>Kyrgistan</option>
    <option>Laos</option>
    <option>Latvia</option>
    <option>Lebanon</option>
    <option>Lesotho</option>
    <option>Liberia</option>
    <option>Libya</option>
    <option>Liechtenstein</option>
    <option>Lithuania</option>
    <option>Luxembourg</option>
    <option>Macau</option>
    <option>Macedonia</option>
    <option>Madagascar</option>
    <option>Malawi</option>
    <option>Malaysia</option>
    <option>Maldives</option>
    <option>Mali</option>
    <option>Malta</option>
    <option>Marshall Islands</option>
    <option>Martinique</option>
    <option>Mauritania</option>
    <option>Mauritius</option>
    <option>Mexico</option>
    <option>Micronesia</option>
    <option>Moldova</option>
    <option>Monaco</option>
    <option>Mongolia</option>
    <option>Montenegro</option>
    <option>Montserrat</option>
    <option>Morocco</option>
    <option>Mozambique</option>
    <option>Myanmar</option>
    <option>Namibia</option>
    <option>Nauru</option>
    <option>Nepal</option>
    <option>Netherlands</option>
    <option>Netherlands Antilles</option>
    <option>New Caledonia</option>
    <option>New Zealand</option>
    <option>Nicaragua</option>
    <option>Niger</option>
    <option>Nigeria</option>
    <option>North Korea</option>
    <option>Northern Mariana Islands</option>
    <option>Norway</option>
    <option>Oman</option>
    <option>Pakistan</option>
    <option>Palau</option>
    <option>Palestine</option>
    <option>Panama</option>
    <option>Papua New Guinea</option>
    <option>Paraguay</option>
    <option>Peru</option>
    <option>Philippines</option>
    <option>Poland</option>
    <option>Portugal</option>
    <option>Puerto Rico</option>
    <option>Qatar</option>
    <option>Reunion</option>
    <option>Romania</option>
    <option>Russia</option>
    <option>Rwanda</option>
    <option>Samoa</option>
    <option>San Marino</option>
    <option>S&atilde;o Tom&eacute; and Principe</option>
    <option>Saudi Arabia</option>
    <option>Senegal</option>
    <option>Serbia</option>
    <option>Seychelles</option>
    <option>Sierra Leone</option>
    <option>Singapore</option>
    <option>Slovakia</option>
    <option>Slovenia</option>
    <option>Solomon Islands</option>
    <option>Somalia</option>
    <option>South Africa</option>
    <option>South Korea</option>
    <option>Spain</option>
    <option>Sri Lanka</option>
    <option>St. Helena</option>
    <option>St. Kitts-Nevis</option>
    <option>St. Lucia</option>
    <option>St. Pierre and Miquelon</option>
    <option>St. Vincent and the Grenadines</option>
    <option>Sudan</option>
    <option>Suriname</option>
    <option>Swaziland</option>
    <option>Sweden</option>
    <option>Switzerland</option>
    <option>Syria</option>
    <option>Taiwan</option>
    <option>Tajikistan</option>
    <option>Tanzania</option>
    <option>Thailand</option>
    <option>Togo</option>
    <option>Tonga</option>
    <option>Trinidad and Tobago</option>
    <option>Tunisia</option>
    <option>Turkey</option>
    <option>Turkmenistan</option>
    <option>Turks and Caicos Islands</option>
    <option>Tuvalu</option>
    <option>Uganda</option>
    <option>Ukraine</option>
    <option>United Arab Emirates</option>
    <option>United Kingdom</option>
    <option>United States</option>
    <option>Uruguay</option>
    <option>US Virgin Islands</option>
    <option>Uzbekistan</option>
    <option>Vanuatu</option>
    <option>Vatican</option>
    <option>Venezuela</option>
    <option>Vietnam</option>
    <option>Wallis and Futuna</option>
    <option>Western Sahara</option>
    <option>Yemen</option>
    <option>Zambia</option>
    <option>Zimbabwe</option>
  </select>
)

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default CountrySelect
