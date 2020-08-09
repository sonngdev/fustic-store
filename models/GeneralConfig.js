import PropTypes from 'prop-types';

const GeneralConfig = PropTypes.shape({
  id: PropTypes.number.isRequired,
  landingVimeoId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export default GeneralConfig;
