import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import { useCart, useCheckoutInfo } from 'hooks/store';
import {
  validateOrder,
  createOrder,
  updateOrder,
  confirmOrder,
} from 'utils/request';
import { buildFlashFromInvalidStockEntries } from 'utils/checkout';
import { setFlashMessages } from 'store/actions';

function WorldwideCheckout() {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&disable-funding=credit`;
    script.addEventListener('load', () => setPaypalLoaded(true));
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  /**
   * Paypal SDK docs: https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/#
   */
  useEffect(() => {
    if (!paypalLoaded) return () => {};

    let orderValidation;

    const handleClick = async (_data, actions) => {
      orderValidation = await validateOrder(cart);

      if (orderValidation.error) {
        const flash = typeof orderValidation.message === 'string'
          ? [orderValidation.message]
          : buildFlashFromInvalidStockEntries(orderValidation.message);
        dispatch(setFlashMessages(flash));
        Router.push('/checkout/summary');
        return actions.reject();
      }

      return actions.resolve();
    };

    const handleCreateOrder = async (_data, actions) => actions.order.create({
      purchase_units: [{
        amount: {
          value: orderValidation.totalAmount.usd.toFixed(2),
        },
      }],
    });

    const handleOnApprove = async (_data, actions) => {
      let order;

      try {
        order = await createOrder('paypal', cart, checkoutInfo);
      } catch {
        return;
      }

      const orderDetails = await actions.order.capture();
      await updateOrder(order.id, orderDetails);
      confirmOrder(order.id);
      Router.push('/checkout/completed');
    };

    const style = { color: 'gold' };

    window.paypal.Buttons({
      onClick: handleClick,
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
