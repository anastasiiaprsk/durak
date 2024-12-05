import  classes from './stack.module.css'
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {firstDistribution} from "../Utils/utils";
import {firstDistributionAct} from "../../../reducers/reducer.js";
import {useSelector} from "react-redux";

export const CardStack = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.state)

        useEffect(() => {
            dispatch(firstDistributionAct(firstDistribution(state)))
        }, [])


    return <div className={classes.card}>
            <img className={classes.backcard} src={'https://dama-pik.com.ua/upload/iblock/e7b/114.jpg'}/>
    </div>
}