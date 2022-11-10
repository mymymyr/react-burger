import PropTypes from 'prop-types';

const burgerPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
});

export {burgerPropTypes};