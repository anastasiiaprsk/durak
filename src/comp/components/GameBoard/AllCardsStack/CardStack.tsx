import classStack from './stack.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firstDistributionAct } from 'comp/reducers/reducer';

export const CardStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firstDistributionAct());
  }, []);

  return (
    <div className={classStack.card}>
      <img
        className={classStack.backcard}
        src={'https://dama-pik.com.ua/upload/iblock/e7b/114.jpg'}
      />
    </div>
  );
};
