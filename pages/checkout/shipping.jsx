/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect } from 'react';
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

  // Never let country empty, once this page has been rendered
  useEffect(() => {
    if (checkoutInfo.country) return;
    dispatch(changeCheckoutInfo('country', 'Vietnam'));
  }, [checkoutInfo]);

  return (
    <Layout>
      <Head>
        <title>Shipping – Checkout – Fustic Store</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/shipping`} />
        <meta name="description" content="Checkout shipping on Fustic. Store" />
        <meta name="keywords" content="fustic store,fustic studio,checkout,shipping" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fustic. Store" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/shipping`} />
        <meta property="og:title" content="Shipping – Checkout – Fustic Store" />
        <meta property="og:description" content="Checkout shipping on Fustic. Store" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/fustic-white.png`} />
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
                    placeholder="City*"
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
                    placeholder="District*"
                    value={checkoutInfo.district}
                    onChange={dispatchChangeInfo('district')}
                  />
                )}
                <input
                  required
                  type="text"
                  className="zip-code"
                  name="zip-code"
                  placeholder="Zip • Postal code*"
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
            padding: 6rem 0 4rem;

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

            @media screen and (min-width: 768px) {
              padding-top: 10rem;

              form {
                padding-left: 5px;
                padding-right: 10px;
              }

              .button-group {
                margin-top: 6em;
              }
            }

            @media screen and (min-width: 1200px) {
              padding-top: 12rem;
            }
          }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default CheckoutShippingPage;
