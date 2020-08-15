import { useState } from 'react';
import Radio from 'components/basic/radio';

const LOCAL_CHECKOUT_METHODS = ['cod', 'bank_transfer'];

function LocalCheckout() {
  const [method, setMethod] = useState(LOCAL_CHECKOUT_METHODS[0]);
  const changeMethod = (e) => setMethod(e.target.value);

  return (
    <div className="local-checkout">
      <h1>CÁCH THỨC THANH TOÁN</h1>
      <Radio
        id="local-checkout-method-0"
        name="local-checkout-method"
        value={LOCAL_CHECKOUT_METHODS[0]}
        defaultChecked={method === LOCAL_CHECKOUT_METHODS[0]}
        onChange={changeMethod}
        label="SHIP C.O.D"
      />
      {method === LOCAL_CHECKOUT_METHODS[0] && (
        <article>
          <h2>Thanh toán khi nhận hàng</h2>
          <p>
            Áp dụng với đơn hàng dưới 1.000.000 VNĐ<br />
            Fustic. Store sẽ liên hệ với quý khách để xác nhận và vận chuyển hàng.
          </p>
        </article>
      )}
      <Radio
        id="local-checkout-method-1"
        name="local-checkout-method"
        value={LOCAL_CHECKOUT_METHODS[1]}
        defaultChecked={method === LOCAL_CHECKOUT_METHODS[1]}
        onChange={changeMethod}
        label="CHUYỂN KHOẢN"
      />
      {method === LOCAL_CHECKOUT_METHODS[1] && (
        <article>
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
      )}

      <style jsx>
        {`
        .local-checkout {
          h1 {
            font-size: 19px;
            margin-bottom: 2rem;
          }

          article {
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
        }
        `}
      </style>
    </div>
  );
}

export default LocalCheckout;
