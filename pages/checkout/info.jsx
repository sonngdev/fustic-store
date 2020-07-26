/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import Layout from 'components/layout';

function CheckoutInfoPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <Layout>
      <div className="checkout-info-page">
        <div className="contact">
          <small>Contact info</small>
          <section className="inputs">
            <input required type="text" className="first-name" name="first-name" placeholder="First name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input required type="text" className="last-name" name="last-name" placeholder="Last name*" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input required type="email" className="email" name="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required type="tel" className="phone" name="phone" placeholder="Phone number*" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </section>
        </div>
        <div className="shipping">
          <small>Shipping</small>
          <section className="inputs">
            <input required type="text" className="country" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <input required type="text" className="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input required type="text" className="district" name="district" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
            <input required type="text" className="zip-code" name="zip-code" placeholder="Zip • Postal code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            <input required type="text" className="address" name="address" placeholder="Address*" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input required type="text" className="notes" name="notes" placeholder="Notes • Instructions" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </section>
        </div>

        <style jsx>
          {`
          .checkout-info-page {
            width: 100%;
            padding: 6rem var(--padding-page) 0;

            .contact {
              small {
                text-transform: uppercase;
              }

              .inputs {
                margin-top: 0.8em;
                display: grid;
                grid-template-areas:
                  "first-name last-name"
                  "email email"
                  "phone phone";
                gap: 10px 8px;

                .first-name {
                  grid-area: first-name;
                }

                .last-name {
                  grid-area: last-name;
                }

                .email {
                  grid-area: email;
                }

                .phone {
                  grid-area: phone;
                }
              }
            }

            .shipping {
              margin-top: 2rem;

              small {
                text-transform: uppercase;
              }

              .inputs {
                margin-top: 0.8em;
                display: grid;
                grid-template-areas:
                  "country city"
                  "district zip-code"
                  "address address"
                  "notes notes";
                gap: 10px;

                .country {
                  grid-area: country;
                }

                .city {
                  grid-area: city;
                }

                .district {
                  grid-area: district;
                }

                .zip-code {
                  grid-area: zip-code;
                }

                .address {
                  grid-area: address;
                }

                .notes {
                  grid-area: notes;
                }
              }
            }

            @media screen and (min-width: 375px) {
              --padding-page: 25px;
            }
          }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default CheckoutInfoPage;
