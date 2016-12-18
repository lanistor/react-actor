import React, { Component } from 'react'
/**
 * data library of react
 */
export default class Actor extends Component{

	constructor(...args){
		super(...args);
	}

	/**
	 * start listen
	 * @param action { string }		     - the name of the action
	 * @param callback  { Function }   - the callback function to receive data
	 * @return {null}
	 */
	onAction = (action, callback) => {
		if(!action || !callback){
			return;
		}

		/**
		 * record the actions
		 */
		if(this._actionRecords[action]){
			this._actionRecords[action].push(callback);
		}else{
			this._actionRecords[action] = [callback];
		}

		/**
		 * record the actions' owner
		 */
		if(this._actionOwnerRecords[this.hashCode()]){
			this._actionOwnerRecords[this.hashCode()].push({action : action, callback : callback});
		}else{
			this._actionOwnerRecords[this.hashCode()] = [{action : action, callback : callback}];
		}
	}

	/**
	 * trigger the action
	 * @param action { string } - the name of target action
	 * @param data 	 { any }		- the data of action
	 * @return { null }
	 */
	act = (action, data) =>{
		if(!this._actionRecords[action] || this._actionRecords[action].length==0){
			return;
		}

		this._actionRecords[action].forEach((callback)=>{
			window.setTimeout(()=>{
				callback(data);
			}, 0);
		})
	}

	/**
	 * componentWillUnmount
	 */
	componentWillUnmount = ()=> {
		if(this._actionOwnerRecords[this.hashCode()]){

			this._actionOwnerRecords[this.hashCode()].forEach((item)=>{

				this._actionRecords[item.action].forEach((callback)=>{
					if(callback===item.callback){
						this._actionRecords[item.action].remove(callback);
					}
				});
			});
			delete this._actionOwnerRecords[this.hashCode()];
		}
	}

	/**
	 * create hash code
	 */
	hashCode=()=>{
		if(this._hashCodeStr){
			return this._hashCodeStr;
		}

		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var nonceStr = '';
		for (var i = 0; i < 8; i++) {
			nonceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		this._hashCodeStr = nonceStr + new Date().getTime();
		return this._hashCodeStr;
	}

}
/**
 * [_actionRecords ]
 * @_actionRecords{
 * 		actionName1 : [function1, function2 ...]
 * }
 */
DataFrame.prototype._actionRecords = {};

/**
 * @_actionOwnerRecords
 * {
 * 		hashCode1 : { action : actionName, callback : function },
 * 		hashCode2 : { action : actionName, callback : function },
 * }
 */
DataFrame.prototype._actionOwnerRecords = {};
