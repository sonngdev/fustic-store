import PropTypes from 'prop-types';

const Product = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  priceVnd: PropTypes.number.isRequired,
  priceUsd: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    singularName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      isThumbnail: PropTypes.bool.isRequired,
      isAltThumbnail: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
});

export default Product;
