import classes from './css-buttons/bita.module.css';
import { useDispatch } from 'react-redux';
export const TakeButton = () => {
  const dispatch = useDispatch();
  const takeButtonOnClick = () => {};
  return (
    <div>
      <button onClick={takeButtonOnClick} className={classes.bitaButton}>
        Беру
      </button>
    </div>
  );
};
