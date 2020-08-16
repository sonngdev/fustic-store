import { useState, useEffect } from 'react';

function WorldwideCheckout() {
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AZ1fsAfRMVncgp8kvZc0rNJnVjKpEwfORHg6Sppa4FYu0wBAdVJ7xX-T3tVzFGlmF7vgC66Dglw89orz';
    script.addEventListener('load', () => setPaypalLoaded(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!paypalLoaded) return;

    const createOrder = (_data, actions) => actions.order.create({
      purchase_units: [{
        amount: {
          value: '0.5',
        },
      }],
    });

    const onApprove = async (_data, actions) => {
      const orderDetails = await actions.order.capture();
      alert(`Transaction completed by ${orderDetails.payer.name.given_name}`);
    };

    const style = { color: 'silver' };

    window.paypal.Buttons({ createOrder, onApprove, style }).render('#paypal-buttons');
  }, [paypalLoaded]);

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
