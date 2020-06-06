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
      className="pure-carousel"
    >
      <div className="container">
        <Slider className="slider">
          {product.images.map((image, i) => (
            <Slide index={i} key={image.url}>
              <ImageWithZoom src={image.url} alt={`${product.name} ${i + 1}`} className="image" />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="button-back">&lt;</ButtonBack>
        <ButtonNext className="button-next">&gt;</ButtonNext>
      </div>

      <style jsx global>
        {`
        .pure-carousel {
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

              .image {
                object-fit: cover;
              }
            }

            .button-back, .button-next {
              font-size: 2rem;
              font-weight: 100;
              background: transparent;
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
                width: 450px;
                height: 600px;
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
        }
        `}
      </style>
    </CarouselProvider>
  );
}
