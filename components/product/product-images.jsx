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
      <Slider className="slider">
        {product.images.map((image, i) => (
          <Slide index={i} key={image.url}>
            <ImageWithZoom src={image.url} alt={`${product.name} ${i + 1}`} className="image" />
          </Slide>
        ))}
      </Slider>
      <ButtonBack className="button-back">&lt;</ButtonBack>
      <ButtonNext className="button-next">&gt;</ButtonNext>

      <style jsx global>
        {`
        .pure-carousel {
          width: 100%;
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
        `}
      </style>
    </CarouselProvider>
  );
}
