import classes from './css-buttons/bita.module.css';
import { bitaButtonAction } from 'comp/reducers/reducer';
import { useDispatch } from 'react-redux';

export const BitaButton = () => {
  const dispatch = useDispatch();

  const bitaButtonOnClick = () => {
    dispatch(bitaButtonAction());
  };
  return (
    <div>
      <button onClick={bitaButtonOnClick} className={classes.bitaButton}>
        Бита
      </button>
    </div>
  );
};
