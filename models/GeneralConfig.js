import PropTypes from 'prop-types';

const GeneralConfig = PropTypes.shape({
  id: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  landingVimeoId: PropTypes.string.isRequired,
  landingPlaceholderImageUrl: PropTypes.string.isRequired,
});

export default GeneralConfig;
