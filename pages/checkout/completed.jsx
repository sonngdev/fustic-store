import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import { completeCheckout } from 'store/actions';
import Layout from 'components/layout';
import Button from 'components/basic/button';

function CheckoutCompletedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(completeCheckout());
  }, []);

  return (
    <Layout>
      <Head>
        <title>Checkout completed – Fustic Store</title>
      </Head>

      <section className="checkout-completed-page">
        <h1>Thank you for supporting Fustic. Store</h1>
        <Link href="/">
          <Button block solid>Done</Button>
        </Link>
      </section>

      <style jsx>
        {`
        .checkout-completed-page {
          padding: 35vh 30px 4rem;
          text-align: center;
          text-transform: uppercase;
          max-width: 60em;

          h1 {
            font-size: var(--fontsize-md);
            font-weight: var(--fontweight-regular);
            opacity: 0.6;
            margin-bottom: 1.5em;
          }

          @media screen and (min-width: 375px) {
            padding-left: 50px;
            padding-right: 50px;
          }

          @media screen and (min-width: 1200px) {
            h1 {
              margin-bottom: 3em;
            }
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutCompletedPage;
