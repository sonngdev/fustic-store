import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import s from './styles/product-images.module.scss';

export default function ProductImages({ product }) {
  return (
    <CarouselProvider
      naturalSlideWidth={240}
      naturalSlideHeight={320}
      totalSlides={product.images.length}
      infinite
      className={s.pureCarousel}
    >
      <Slider className={s.slider}>
        {product.images.map((image, i) => (
          <Slide index={i} key={image.url}>
            <Image src={image.url} alt={`${product.name} ${i + 1}`} className={s.image} />
          </Slide>
        ))}
      </Slider>
      <ButtonBack className={s.buttonBack}>&lt;</ButtonBack>
      <ButtonNext className={s.buttonNext}>&gt;</ButtonNext>
    </CarouselProvider>
  );
}
