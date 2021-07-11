import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_EPICS } from './ActionName'
import {NAME_ACTIONS}from '../../action/ShoppingCartAction/ActionName'
import ShoppingCartBusiness from '../../../bussiness/ShoppingCartBusiness';


let messageError = {};

const resolver = (action) => {
    const shoppingCartBusiness = new ShoppingCartBusiness();
    return new Promise((resolve, reject) => {
        switch (action.type) {
            case NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_SCREEN:
                shoppingCartBusiness.addToShoppingCart(action.data,success => {
                    resolve({
                        actionType: NAME_ACTIONS.SHOPPING_CART_ACTIONS.SHOPPING_CART_ACTIONS_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.SHOPPING_CART_ACTIONS.SHOPPING_CART_ACTIONS_FAIL));
                })
                break;
            case NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_SCREEN:
                shoppingCartBusiness.getAllProduct(action.data,success => {
                    console.log("epic success",success);
                    resolve({
                        actionType: NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_SUCCESS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_FAIL));
                })
                break;
            default:
                console.error('Error when resolver ShoppingCart Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    console.log("data.data.data",data.data.data);
    switch (data.actionType) {
        case NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_SUCCESS:
            return {
                type: NAME_EPICS.SHOPPING_CART_EPICS.ADD_EPICS_SUCCESS,
                data: data.data.data
            };
        case NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_SUCCESS:
            return {
                type: NAME_EPICS.SHOPPING_CART_EPICS.GET_ALL_EPICS_SUCCESS,
                data: data.data.data
            };
        default:
            console.error('Error when dispatch ShoppingCart  Epic.');
            return new Error('Error when dispatch  ShoppingCart  Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_FAIL:
            return {
                type: NAME_EPICS.SHOPPING_CART_EPICS.ADD_EPICS_FAIL,
                data: messageError
            }
        case NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_FAIL:
            return {
                type: NAME_EPICS.SHOPPING_CART_EPICS.GET_ALL_EPICS_FAIL,
                data: messageError
            }
        default:
            console.error('Error when dispatch error  ShoppingCart  Epic.');
            return new Error('Error when dispatch error  ShoppingCart  Epic.'); 
    }
};

const ShoppingCartEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.SHOPPING_CART_ACTIONS.GET_ALL_SCREEN,
            NAME_ACTIONS.SHOPPING_CART_ACTIONS.ADD_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ShoppingCartEpic;