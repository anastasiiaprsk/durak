import classes from './css-buttons/bita.module.css';
import { changeTurnOfThePlayerAction } from 'comp/reducers/reducer';
import { useDispatch } from 'react-redux';
export const ChangeTurnOfThePlayerButton = () => {
  const dispatch = useDispatch();
  const changeTurnOnClick = () => {
    dispatch(changeTurnOfThePlayerAction());
  };
  return (
    <div>
      <button onClick={changeTurnOnClick} className={classes.bitaButton}>
        Передать очередь
      </button>
    </div>
  );
};
