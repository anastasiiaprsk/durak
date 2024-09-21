import  classes from './stack.module.css'
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {firstDistribution} from "../Utils/utils";
import {firstDistributionAct} from "../../../reducers/reducer";

export const CardStack = () => {
    const dispatch = useDispatch()

        useEffect(() => {
            dispatch(firstDistributionAct(firstDistribution()))
        }, [])


    return <div className={classes.card}>
            <img className={classes.backcard} src={'https://dama-pik.com.ua/upload/iblock/e7b/114.jpg'}/>
    </div>
}