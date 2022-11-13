import PropTypes from 'prop-types';

const BURGER_PROP_TYPES = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
});

const DATA_ITEM_PROP_TYPES = PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
});


export { BURGER_PROP_TYPES, DATA_ITEM_PROP_TYPES };