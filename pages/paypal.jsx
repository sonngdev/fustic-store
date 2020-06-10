import { useEffect } from 'react';
import Head from 'next/head';

export default function Paypal() {
  useEffect(() => {
    window.paypal.Buttons().render('#paypal-button');
  });

  return (
    <>
      <Head>
        <script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
      </Head>

      <h1>Hello Paypal</h1>
      <div id="paypal-button"></div>
    </>
  )
}
