import { useDispatch, useSelector } from "react-redux";
import { PushInBasket } from "../../features/shopSlice";
import styles from "../ShopCard/ShopCard.module.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ShopCard = ({ product, userId }) => {

  const basket = useSelector(state => state.shopSlice.basket)
  const dispatch = useDispatch()

  useEffect(() => {
    Aos.init({ duration: 2000 })
  })

  function handleAddInBasket(productId) {
    dispatch(PushInBasket({ userId, productId, product }))
  }

  return (
    <div data-aos='zoom-in-up' className={styles.Card}>
      <div className={styles.image}>
        <img src={`http://localhost:3013/img/${product.image}`} alt="q" />
      </div>
      <div className={styles.about}>
        <div className={styles.text}> <h4>{product.name}</h4> </div>
        <div className={styles.text}> <h4>£{product.price}</h4> </div>
      </div>
      <div className={styles.Butt}>
        {
          basket.find(elem => elem._id === product._id)
            ?
            <button disabled={true} >Уже в корзине</button>
            :
            <button onClick={() => handleAddInBasket(product._id)}>Добавить в корзину</button>
        }
      </div>
    </div>
  );
};

ShopCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
}

export default ShopCard;
