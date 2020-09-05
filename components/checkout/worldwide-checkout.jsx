import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useCart, useCheckoutInfo } from 'hooks/store';
import { createOrder, updateOrder } from 'utils/request';

function WorldwideCheckout() {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();
  const orderRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&disable-funding=credit`;
    script.addEventListener('load', () => setPaypalLoaded(true));
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!paypalLoaded) return () => {};

    const handleCreateOrder = async (_data, actions) => {
      if (!orderRef.current) {
        orderRef.current = await createOrder('paypal', cart, checkoutInfo);
      }

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: orderRef.current.totalAmountUsd.toFixed(2),
          },
        }],
      });
    };

    const handleOnApprove = async (_data, actions) => {
      const orderDetails = await actions.order.capture();
      updateOrder(orderRef.current.id, orderDetails);
      Router.push('/checkout/completed');
    };

    const style = { color: 'gold' };

    window.paypal.Buttons({
      createOrder: handleCreateOrder,
      onApprove: handleOnApprove,
      style,
    }).render('#paypal-buttons');

    return () => { document.getElementById('paypal-buttons').innerHTML = ''; };
  }, [paypalLoaded, cart, checkoutInfo]);

  return (
    <section className="worldwide-checkout">
      <div id="paypal-buttons" />

      <style jsx>
        {`
        .worldwide-checkout {
          padding-left: 30px;
          padding-right: 30px;

          #paypal-buttons {
            background-color: white;
            border-radius: 3px;
            padding: 10px;
            max-width: 37.5em;
            margin: 0 auto;
          }

          @media screen and (min-width: 375px) {
            padding-left: 50px;
            padding-right: 50px;
          }
        }
        `}
      </style>
    </section>
  );
}

export default WorldwideCheckout;