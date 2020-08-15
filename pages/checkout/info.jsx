/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import { saveCheckoutInfo } from 'store/actions';
import { countryList } from 'utils/checkout';
import { useCheckoutInfo } from 'hooks/store';

import Layout from 'components/layout';
import Button from 'components/basic/button';
import Select from 'components/basic/select';

function CheckoutInfoPage() {
  const checkoutInfo = useCheckoutInfo();

  const [firstName, setFirstName] = useState(checkoutInfo?.contact?.firstName || '');
  const [lastName, setLastName] = useState(checkoutInfo?.contact?.lastName || '');
  const [email, setEmail] = useState(checkoutInfo?.contact?.email || '');
  const [phone, setPhone] = useState(checkoutInfo?.contact?.phone || '');

  const [country, setCountry] = useState(checkoutInfo?.shipping?.country || 'Vietnam');
  const [city, setCity] = useState(checkoutInfo?.shipping?.city || '');
  const [district, setDistrict] = useState(checkoutInfo?.shipping?.district || '');
  const [zipCode, setZipCode] = useState(checkoutInfo?.shipping?.zipCode || '');
  const [address, setAddress] = useState(checkoutInfo?.shipping?.address || '');
  const [notes, setNotes] = useState(checkoutInfo?.shipping?.notes || '');

  const toVietnam = country === 'Vietnam';

  const dispatch = useDispatch();

  const submitInfo = (e) => {
    e.preventDefault();
    dispatch(saveCheckoutInfo({
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      district,
      zipCode,
      address,
      notes,
    }));
    Router.push('/checkout/method');
  };

  return (
    <Layout>
      <div className="checkout-info-page">
        <form onSubmit={submitInfo}>
          <section className="contact">
            <small>Contact info</small>
            <article className="inputs">
              <input required type="text" className="first-name" name="first-name" placeholder="First name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input required type="text" className="last-name" name="last-name" placeholder="Last name*" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input required type="email" className="email" name="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input required type="tel" className="phone" name="phone" placeholder="Phone number*" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </article>
          </section>
          <section className="shipping">
            <small>Shipping</small>
            <article className="inputs">
              <Select required className="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                {countryList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
              {toVietnam && (
                <input required type="text" className="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              )}
              {toVietnam && (
                <input required type="text" className="district" name="district" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
              )}
              <input required type="text" className="zip-code" name="zip-code" placeholder="Zip • Postal code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              <input required type="text" className="address" name="address" placeholder="Address*" value={address} onChange={(e) => setAddress(e.target.value)} />
              <input type="text" className="notes" name="notes" placeholder="Notes • Instructions" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </article>
          </section>

          <div className="button-group">
            <Button block onClick={Router.back}>Back</Button>
            <Button block solid>Continue</Button>
          </div>
        </form>

        <style jsx>
          {`
          .checkout-info-page {
            width: 100%;
            max-width: 500px;
            padding: 6rem var(--padding-page) 0;

            .contact {
              small {
                text-transform: uppercase;
              }

              .inputs {
                margin-top: 0.8em;
                display: grid;
                grid-template-columns: 1fr 1fr;
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
                grid-template-columns: 1fr 1fr;
                grid-template-areas: ${toVietnam ? (`
                  "country city"
                  "district zip-code"
                  "address address"
                  "notes notes"
                `) : (`
                  "country zip-code"
                  "address address"
                  "notes notes"
                `)};
                gap: 10px 8px;

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

            .button-group {
              margin: 4rem auto 0;

              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 10px;
            }

            @media screen and (min-width: 375px) {
              --padding-page: 25px;
            }

            @media screen and (min-width: 1200px) {
              padding-top: 8rem;
            }
          }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default CheckoutInfoPage;
