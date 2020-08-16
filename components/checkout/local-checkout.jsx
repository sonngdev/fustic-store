import { useState } from 'react';
import Router from 'next/router';
import cx from 'classnames';
import Radio from 'components/basic/radio';
import Button from 'components/basic/button';

const LOCAL_CHECKOUT_METHODS = ['cod', 'bank_transfer'];

function LocalCheckout() {
  const [method, setMethod] = useState(LOCAL_CHECKOUT_METHODS[0]);
  const changeMethod = (e) => setMethod(e.target.value);

  return (
    <div className="local-checkout">
      <h1>CÁCH THỨC THANH TOÁN</h1>

      <div className="methods">
        <Radio
          id="local-checkout-method-0"
          name="local-checkout-method"
          value={LOCAL_CHECKOUT_METHODS[0]}
          defaultChecked={method === LOCAL_CHECKOUT_METHODS[0]}
          onChange={changeMethod}
          label="SHIP C.O.D"
        />
        <article className={cx({ active: method === LOCAL_CHECKOUT_METHODS[0] })}>
          <h2>Thanh toán khi nhận hàng</h2>
          <p>
            Áp dụng với đơn hàng dưới 1.000.000 VNĐ<br />
            Fustic. Store sẽ liên hệ với quý khách để xác nhận và vận chuyển hàng.
          </p>
        </article>

        <Radio
          id="local-checkout-method-1"
          name="local-checkout-method"
          value={LOCAL_CHECKOUT_METHODS[1]}
          defaultChecked={method === LOCAL_CHECKOUT_METHODS[1]}
          onChange={changeMethod}
          label="CHUYỂN KHOẢN"
        />
        <article className={cx({ active: method === LOCAL_CHECKOUT_METHODS[1] })}>
          <h2>Thanh toán trực tuyến</h2>
          <p>
            Ngân Hàng TMCP Kỹ Thương Việt Nam TECHCOMBANK chi nhánh Hà Nội.<br />
            19030318358017<br />
            DOAN THANH HAI
          </p>
          <p>
            Vui lòng ghi rõ số điện thoại đặt hàng vào phần nội dung chuyển tiền.
            Fustic. Store sẽ liên hệ với bạn để xác nhận đơn hàng và vận chuyển
            ngay sau khi nhận được thông báo chuyển khoản.
          </p>
        </article>
      </div>

      <div className="button-group">
        <Button block onClick={Router.back}>Trở về</Button>
        <Button block solid>Hoàn tất</Button>
      </div>

      <style jsx>
        {`
        .local-checkout {
          max-width: 390px;

          h1 {
            font-size: 19px;
            margin-bottom: 1.5em;
          }

          article {
            display: none;

            &.active {
              display: block;
            }

            h2 {
              font-size: var(--fontsize-md);
              font-weight: var(--fontweight-regular);
              opacity: 0.5;
              margin: 0.4em 0;
            }

            p {
              margin: 0.6em 0 1.2em;
              font-weight: var(--fontweight-regular);
              line-height: 1.25;
            }
          }

          .button-group {
            margin-top: 3rem;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10px;
          }

          @media screen and (min-width: 992px) {
            max-width: none;
            margin-top:

            h1 {
              text-align: center;
              margin-bottom: 2em;
            }

            .methods {
              display: grid;
              grid-template-columns: 150px 400px;

              article {
                display: block;

                &:not(.active) p {
                  display: none;
                }

                h2 {
                  margin-top: 0;
                }
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}

export default LocalCheckout;
