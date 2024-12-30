import classes from './css-buttons/bita.module.css';

export const PermissionToTakeCardsButton = () => {
  const onClickPermissionButton = () => {};
  return (
    <div>
      <button onClick={onClickPermissionButton} className={classes.bitaButton}>
        Пусть берет
      </button>
    </div>
  );
};
