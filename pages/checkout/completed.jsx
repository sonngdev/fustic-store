import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
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
      <section className="checkout-completed">
        <h1>Thank you for supporting Fustic. Store</h1>
        <Link href="/">
          <Button block solid>Done</Button>
        </Link>
      </section>

      <style jsx>
        {`
        .checkout-completed {
          padding: 15rem var(--padding-page) 0;
          text-align: center;
          width: 100%;
          max-width: 350px;

          h1 {
            font-size: var(--fontsize-md);
            font-weight: var(--fontweight-regular);
            opacity: 0.6;
            margin-bottom: 1.5em;
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
