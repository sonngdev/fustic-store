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
        <title>Completed – Checkout – Fustic Store</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/completed`} />
        <meta name="description" content="Checkout completed on Fustic. Store" />
        <meta name="keywords" content="fustic store,fustic studio,checkout,completed" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fustic. Store" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/completed`} />
        <meta property="og:title" content="Completed – Checkout – Fustic Store" />
        <meta property="og:description" content="Checkout completed on Fustic. Store" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/fustic-white.png`} />
      </Head>

      <section className="checkout-completed-page">
        <div className="notice">
          <h1>Thank you for shopping with Fustic.</h1>
          <p>
            Please check your email including spam box or junk box to make sure
            you receive email confirmation for your order.
          </p>
        </div>
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

          .notice {
            margin-bottom: 1.5em;

            h1, p {
              font-size: var(--fontsize-md);
              opacity: 0.6;
            }

            h1 {
              font-weight: var(--fontweight-bold);
            }

            p {
              font-weight: var(--fontweight-regular);
              padding-left: 1em;
              padding-right: 1em;
            }
          }

          @media screen and (min-width: 375px) {
            padding-left: 50px;
            padding-right: 50px;
          }

          @media screen and (min-width: 1200px) {
            .notice {
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
