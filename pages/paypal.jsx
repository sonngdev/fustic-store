import { useEffect } from 'react';
import Head from 'next/head';

export default function Paypal() {
  useEffect(() => {
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '8'
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
        <script src="https://www.paypal.com/sdk/js?client-id=AVhHplhUoO7AJdreVmzdYVx_gxNs_TdLZtf81Zuv7AnX8WvEsErqDTOjdBG2s5IlgvOlvNwjwzbeKM6a"></script>
      </Head>

      <h1>Hello Paypal</h1>
      <div id="paypal-button"></div>
    </>
  )
}
