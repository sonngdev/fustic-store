import { useState } from 'react';
import Router from 'next/router';
import cx from 'classnames';
import { useCart, useCheckoutInfo } from 'hooks/store';
import { createOrder } from 'utils/request';
import Radio from 'components/basic/radio';
import Button from 'components/basic/button';
import CheckoutLayout from 'components/checkout/checkout-layout';
import CartTotal from 'components/checkout/cart-total';

const LOCAL_CHECKOUT_METHODS = ['cod', 'bank_transfer'];

function LocalCheckout() {
  const [method, setMethod] = useState(LOCAL_CHECKOUT_METHODS[0]);
  const changeMethod = (e) => setMethod(e.target.value);

  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();

  const completeOrder = () => {
    createOrder(method, cart, checkoutInfo);
    Router.push('/checkout/completed');
  };

  return (
    <section className="local-checkout">
      <CheckoutLayout>
        <section className="methods">
          <Radio
            id="local-checkout-method-0"
            name="local-checkout-method"
            value={LOCAL_CHECKOUT_METHODS[0]}
            defaultChecked={method === LOCAL_CHECKOUT_METHODS[0]}
            onChange={changeMethod}
            label="Ship C.O.D | Cash on delivery"
          />
          <article className={cx({ active: method === LOCAL_CHECKOUT_METHODS[0] })}>
            <h2>Thanh toán khi nhận hàng</h2>
            <p>
              Áp dụng với đơn hàng dưới 1.000.000 VNĐ<br />
              Fustic. Store sẽ liên hệ với quý khách để xác nhận và vận chuyển hàng.
            </p>
            <p>
              Applicable to orders under 1,000,000 VND.<br />
              We will contact you to confirm and ship.
            </p>
          </article>

          <Radio
            id="local-checkout-method-1"
            name="local-checkout-method"
            value={LOCAL_CHECKOUT_METHODS[1]}
            defaultChecked={method === LOCAL_CHECKOUT_METHODS[1]}
            onChange={changeMethod}
            label="Chuyển khoản | Money transfer"
          />
          <article className={cx({ active: method === LOCAL_CHECKOUT_METHODS[1] })}>
            <h2>Thanh toán trực tuyến</h2>
            <p>
              TECHCOMBANK<br />
              chi nhánh Hà Nội.<br />
              19030318358017<br />
              DOAN THANH HAI
            </p>
            <p>
              Vui lòng ghi rõ số điện thoại đặt hàng vào phần nội dung chuyển tiền.
              Fustic. Store sẽ liên hệ với bạn để xác nhận đơn hàng và vận chuyển
              ngay sau khi nhận được thông báo chuyển khoản.
            </p>
            <p>
              Please fill your phone number in the transfer content section. We
              will contact you shortly to confirm your purchase after receiving
              the payment.
            </p>
          </article>
        </section>

        <div className="info">
          <CartTotal />

          <section className="button-group">
            <Button block onClick={Router.back}>Back</Button>
            <Button block solid onClick={completeOrder}>Complete</Button>
          </section>
        </div>
      </CheckoutLayout>

      <style jsx>
        {`
        .local-checkout {
          article {
            display: none;

            &.active {
              display: block;
            }

            h2 {
              font-size: var(--fontsize-md);
              font-weight: var(--fontweight-regular);
              opacity: 0.4;
              margin: 0.4em 0;
            }

            p {
              margin: 0.6em 0 1.2em;
              font-weight: var(--fontweight-thin);
              line-height: 1.25;
            }
          }

          .button-group {
            margin-top: 4rem;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10px;
          }

          @media screen and (min-width: 768px) {
            max-width: none;

            article {
              min-width: 250px;
              max-width: 350px;
            }

            .button-group {
              margin-top: 6rem;
            }
          }

          @media screen and (min-width: 1800px) {
            article {
              h2, p {
                font-size: 22px;
              }
            }
          }
        }
        `}
      </style>
    </section>
  );
}

export default LocalCheckout;