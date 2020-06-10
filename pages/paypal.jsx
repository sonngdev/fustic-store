import { useEffect } from 'react';
import Head from 'next/head';

export default function Paypal() {
  useEffect(() => {
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '0.5'
          }
        }]
      });
    };

    const onApprove = (data, actions) => {
      return actions.order.capture().then(function(details) {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }

    window.paypal.Buttons({ createOrder, onApprove }).render('#paypal-button');
  });

  return (
    <>
      <Head>
        <script src="https://www.paypal.com/sdk/js?client-id=AZ1fsAfRMVncgp8kvZc0rNJnVjKpEwfORHg6Sppa4FYu0wBAdVJ7xX-T3tVzFGlmF7vgC66Dglw89orz"></script>
      </Head>

      <h1>Hello Paypal</h1>
      <div id="paypal-button"></div>
    </>
  )
}
