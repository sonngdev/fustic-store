/* eslint-disable jsx-a11y/label-has-associated-control */

import { useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

import { changeCheckoutInfo } from 'store/actions';
import { countryList, cartValid, checkoutInfoValid } from 'utils/checkout';
import { useCheckoutInfo, useCart } from 'hooks/store';

import Layout from 'components/layout';
import Button from 'components/basic/button';
import Select from 'components/basic/select';
import CheckoutLayout from 'components/checkout/checkout-layout';
import CartTotal from 'components/checkout/cart-total';

function CheckoutShippingPage() {
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();

  const toVietnam = checkoutInfo.country === 'Vietnam';
  const dispatch = useDispatch();

  const dispatchChangeInfo = (key) => (e) => {
    if (key === 'country') {
      dispatch(changeCheckoutInfo('city', ''));
      dispatch(changeCheckoutInfo('district', ''));
    }
    dispatch(changeCheckoutInfo(key, e.target.value));
  };

  const submitInfo = (e) => {
    e.preventDefault();
    Router.push('/checkout/payment');
  };

  if (!cartValid(cart)) {
    Router.replace('/checkout/summary');
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Shipping – Fustic Store</title>
      </Head>

      <div className="checkout-shipping-page">
        <CheckoutLayout>
          <form onSubmit={submitInfo}>
            <section className="contact">
              <small>Contact info</small>
              <article className="inputs">
                <input
                  required
                  type="text"
                  className="first-name"
                  name="first-name"
                  placeholder="First name*"
                  value={checkoutInfo.firstName}
                  onChange={dispatchChangeInfo('firstName')}
                />
                <input
                  required
                  type="text"
                  className="last-name"
                  name="last-name"
                  placeholder="Last name*"
                  value={checkoutInfo.lastName}
                  onChange={dispatchChangeInfo('lastName')}
                />
                <input
                  required
                  type="email"
                  className="email"
                  name="email"
                  placeholder="Email*"
                  value={checkoutInfo.email}
                  onChange={dispatchChangeInfo('email')}
                />
                <input
                  required
                  type="tel"
                  className="phone"
                  name="phone"
                  placeholder="Phone number*"
                  value={checkoutInfo.phone}
                  onChange={dispatchChangeInfo('phone')}
                />
              </article>
            </section>
            <section className="shipping">
              <small>Shipping</small>
              <article className="inputs">
                <Select
                  required
                  className="country"
                  name="country"
                  value={checkoutInfo.country}
                  onChange={dispatchChangeInfo('country')}
                >
                  {countryList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
                {toVietnam && (
                  <input
                    required
                    type="text"
                    className="city"
                    name="city"
                    placeholder="City"
                    value={checkoutInfo.city}
                    onChange={dispatchChangeInfo('city')}
                  />
                )}
                {toVietnam && (
                  <input
                    required
                    type="text"
                    className="district"
                    name="district"
                    placeholder="District"
                    value={checkoutInfo.district}
                    onChange={dispatchChangeInfo('district')}
                  />
                )}
                <input
                  required
                  type="text"
                  className="zip-code"
                  name="zip-code"
                  placeholder="Zip • Postal code"
                  value={checkoutInfo.zipCode}
                  onChange={dispatchChangeInfo('zipCode')}
                />
                <input
                  required
                  type="text"
                  className="address"
                  name="address"
                  placeholder="Address*"
                  value={checkoutInfo.address}
                  onChange={dispatchChangeInfo('address')}
                />
                <input
                  type="text"
                  className="notes"
                  name="notes"
                  placeholder="Notes • Instructions"
                  value={checkoutInfo.notes}
                  onChange={dispatchChangeInfo('notes')}
                />
              </article>
            </section>
          </form>

          <div className="info">
            <CartTotal />

            <div className="button-group">
              <Button block onClick={Router.back}>Back</Button>
              <Button
                block
                solid
                onClick={submitInfo}
                disabled={!checkoutInfoValid(checkoutInfo)}
              >
                Continue
              </Button>
            </div>
          </div>
        </CheckoutLayout>

        <style jsx>
          {`
          .checkout-shipping-page {
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

            @media screen and (min-width: 768px) {
              padding-top: 12rem;
              max-width: none;

              form {
                padding-right: 10px;
              }

              .button-group {
                margin-top: 6em;
              }
            }
          }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default CheckoutShippingPage;
