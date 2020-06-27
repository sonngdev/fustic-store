import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';

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
          width: 100%;

          .container {
            display: grid;
            grid-template-columns: 1fr 240px 1fr;
            grid-template-areas: "button-back slider button-next";
            justify-items: center;
            align-items: center;

            .slider {
              grid-area: slider;
              width: 240px;
              height: 320px;

              .carousel__image--with-background {
                background-position: center;
              }
            }

            .button-back, .button-next {
              width: 30px;
              height: 30px;

              img {
                width: 15px;
                height: 15px;
              }
            }

            .button-back {
              grid-area: button-back;
            }

            .button-next {
              grid-area: button-next;
            }
          }

          @media screen and (min-width: 1200px) {
            width: auto;

            .container {
              display: block;
              position: relative;

              .slider {
                width: 360px;
                height: 480px;
              }

              .button-back, .button-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                text-shadow: var(--shadow-md);
                font-size: 3rem;
              }

              .button-back {
                left: 0;
              }

              .button-next {
                right: 0;
              }
            }
          }

          @media screen and (min-width: 1400px) {
            .container .slider {
              width: 450px;
              height: 600px;
            }
          }

          @media screen and (min-width: 1600px) {
            .container .slider {
              width: 600px;
              height: 900px;
            }
          }
        }
        `}
      </style>
    </CarouselProvider>
  );
}
