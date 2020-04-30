import Head from 'next/head';
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import Layout from 'components/layout';
import s from './styles/index.module.scss';

export default function Product({ category, product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name} – {category.name} – Not At All Clothing</title>
      </Head>

      <h1 className="category">{category.name}</h1>

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

      <style jsx>
        {`
        .category {
          font-size: var(--fontsize-small);
          font-weight: normal;
          text-transform: uppercase;
          margin-top: 0;
          margin-bottom: calc(var(--spacing-xl) - var(--fontsize-small) - 2px);
        }
        `}
      </style>
    </Layout>
  );
}

// GET /products
export async function getStaticPaths() {
  const products = [
    {
      id: 1,
      categoryId: 1,
      categorySlug: 't-shirts',
      name: 'ACID TEE',
      slug: 'acid-tee',
      images: [
        {
          url: 'https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/94425713_2823540537767418_7774663410383496143_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=eHJHiJVtinoAX_XBfwf&oh=536eb24c7cb72df87d88ed3bd102f2b3&oe=5ED22BF0',
          isThumbnail: true,
        },
        {
          url: 'https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/94596078_239220547436358_7000800720627787831_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=S_v4tBT98MAAX9OcG0Y&oh=84cabbd58fdc4003d2cb2543d31a40cb&oe=5ED097EF',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 2,
      categoryId: 1,
      categorySlug: 't-shirts',
      name: 'DOPE ACID TEE',
      slug: 'dope-acid-tee',
      images: [
        {
          url: 'https://instagram.fhan2-4.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/91573456_2423894274376846_58500752945725425_n.jpg?_nc_ht=instagram.fhan2-4.fna.fbcdn.net&_nc_cat=110&_nc_ohc=1VX0g1NShg8AX9LaJ6E&oh=d5adda87f8ebb1b8f148e15d0f7285ad&oe=5ED20043',
          isThumbnail: true,
        },
        {
          url: 'https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/91933100_2497616580568763_5396839963480248638_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=PdjyG2d0o-sAX9E1bs1&oh=81dac363e17ef4fffbd47bbbe6950e0e&oe=5ECFEAF0',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
  ];

  const categorySlugs = new Set(products.map((product) => product.categorySlug));
  const paths = [...categorySlugs].reduce((acc, categorySlug) => {
    const prods = products.filter((product) => product.categorySlug === categorySlug);
    const ps = prods.map((prod) => ({ params: { categorySlug, productSlug: prod.slug } }));
    return [...acc, ...ps];
  }, []);

  return {
    paths,
    fallback: false,
  }
}

// GET /categories/:slug
// GET /categories/:category_slug/products/:slug
export async function getStaticProps({ params }) {
  const category = {
    id: 1,
    name: params.categorySlug,
    slug: params.categorySlug,
  };

  const product = {
    id: 1,
    categoryId: 1,
    categorySlug: params.categorySlug,
    name: 'ACID TEE',
    slug: 'acid-tee',
    images: [
      {
        url: 'https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/94425713_2823540537767418_7774663410383496143_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=eHJHiJVtinoAX_XBfwf&oh=536eb24c7cb72df87d88ed3bd102f2b3&oe=5ED22BF0',
        isThumbnail: true,
      },
      {
        url: 'https://instagram.fhan2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/94596078_239220547436358_7000800720627787831_n.jpg?_nc_ht=instagram.fhan2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=S_v4tBT98MAAX9OcG0Y&oh=84cabbd58fdc4003d2cb2543d31a40cb&oe=5ED097EF',
        isThumbnail: false,
      },
    ],
    priceVnd: 420000,
    priceUsd: 20,
    sizes: ['S', 'M', 'L'],
  };

  return {
    props: {
      category,
      product,
    },
  };
}
