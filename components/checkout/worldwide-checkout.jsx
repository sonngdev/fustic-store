import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useCart, useCheckoutInfo } from 'hooks/store';
import { createOrder } from 'utils/request';

function WorldwideCheckout() {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();
  const orderRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AZ1fsAfRMVncgp8kvZc0rNJnVjKpEwfORHg6Sppa4FYu0wBAdVJ7xX-T3tVzFGlmF7vgC66Dglw89orz';
    script.addEventListener('load', () => setPaypalLoaded(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!paypalLoaded) return;

    const handleCreateOrder = async (_data, actions) => {
      const order = await createOrder(cart, checkoutInfo);
      orderRef.current = order;

      console.log('handleCreateOrder', _data);

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: order.totalAmount,
          },
        }],
      });
    };

    const handleOnApprove = async (_data, actions) => {
      console.log('handleOnApprove', _data);

      const orderDetails = await actions.order.capture();
      Router.push('/checkout/completed');
    };

    const style = { color: 'silver' };

    document.getElementById('paypal-buttons').innerHTML = '';
    window.paypal.Buttons({
      createOrder: handleCreateOrder,
      onApprove: handleOnApprove,
      style,
    }).render('#paypal-buttons');
  }, [paypalLoaded, cart, checkoutInfo]);

  return (
    <section className="worldwide-checkout">
      <div id="paypal-buttons" />

      <style jsx>
        {`
        .worldwide-checkout {
          background-color: white;
          border-radius: 3px;
          padding: 10px;
          max-width: 500px;
          margin: 0 auto;
        }
        `}
      </style>
    </section>
  );
}

export default WorldwideCheckout;
