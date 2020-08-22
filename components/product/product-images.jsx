import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import Product from 'models/Product';

export default function ProductImages({ product }) {
  return (
    <CarouselProvider
      naturalSlideWidth={240}
      naturalSlideHeight={320}
      totalSlides={product.images.length}
      infinite
      className="product-images"
    >
      <div className="container">
        <Slider className="slider">
          {product.images.map((image, i) => (
            <Slide index={i} key={image.url}>
              <ImageWithZoom src={image.url} alt={`${product.name} ${i + 1}`} />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="button-back">
          <img src="/icons/arrow-left.svg" alt="Back" />
        </ButtonBack>
        <ButtonNext className="button-next">
          <img src="/icons/arrow-right.svg" alt="Next" />
        </ButtonNext>
      </div>

      <style jsx global>
        {`
        .product-images {
          --button-size: 15px;

          width: 100%;

          .container {
            display: grid;
            grid-template-columns: 1fr 240px 1fr;
            grid-template-areas: "button-back slider button-next";
            justify-items: center;
            align-items: center;

            margin: 0 auto;

            .slider {
              grid-area: slider;
              width: 240px;
              height: 320px;

              .carousel__image--with-background {
                background-position: center;
              }
            }

            .button-back, .button-next {
              display: flex;
              align-items: center;

              width: var(--button-size);
              height: var(--button-size);
              padding: 0;

              img {
                width: var(--button-size);
                height: var(--button-size);
              }
            }

            .button-back {
              grid-area: button-back;
              justify-self: left;
              justify-content: left;
            }

            .button-next {
              grid-area: button-next;
              justify-self: right;
              justify-content: right;
            }
          }

          @media screen and (min-width: 480px) {
            --button-size: 20px;
          }

          @media screen and (min-width: 768px) {
            --button-size: 25px;

            .container .slider {
              width: 360px;
              height: 480px;
            }
          }

          @media screen and (min-width: 992px) {
            --button-size: 1.83em;

            width: auto;

            .container {
              display: block;
              position: relative;

              .button-back, .button-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
              }

              .button-back {
                left: 0;
              }

              .button-next {
                right: 0;
              }
            }
          }

          @media screen and (min-width: 1200px) {
            .container .slider {
              width: 450px;
              height: 600px;
            }
          }

          @media screen and (min-width: 1600px) {
            .container .slider {
              width: 600px;
              height: 800px;
            }
          }
        }
        `}
      </style>
    </CarouselProvider>
  );
}

ProductImages.propTypes = {
  product: Product.isRequired,
};
