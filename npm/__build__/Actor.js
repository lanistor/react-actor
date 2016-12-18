'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * data library of react
 */

var Actor = function (_Component) {
	_inherits(Actor, _Component);

	function Actor() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Actor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Actor)).call.apply(_Object$getPrototypeO, [this].concat(args)));

		_this.onAction = function (action, callback) {
			if (!action || !callback) {
				return;
			}

			/**
    * record the actions
    */
			if (_this._actionRecords[action]) {
				_this._actionRecords[action].push(callback);
			} else {
				_this._actionRecords[action] = [callback];
			}

			/**
    * record the actions' owner
    */
			if (_this._actionOwnerRecords[_this.hashCode()]) {
				_this._actionOwnerRecords[_this.hashCode()].push({ action: action, callback: callback });
			} else {
				_this._actionOwnerRecords[_this.hashCode()] = [{ action: action, callback: callback }];
			}
		};

		_this.act = function (action, data) {
			if (!_this._actionRecords[action] || _this._actionRecords[action].length == 0) {
				return;
			}

			_this._actionRecords[action].forEach(function (callback) {
				window.setTimeout(function () {
					callback(data);
				}, 0);
			});
		};

		_this.componentWillUnmount = function () {
			if (_this._actionOwnerRecords[_this.hashCode()]) {

				_this._actionOwnerRecords[_this.hashCode()].forEach(function (item) {

					_this._actionRecords[item.action].forEach(function (callback) {
						if (callback === item.callback) {
							_this._actionRecords[item.action].remove(callback);
						}
					});
				});
				delete _this._actionOwnerRecords[_this.hashCode()];
			}
		};

		_this.hashCode = function () {
			if (_this._hashCodeStr) {
				return _this._hashCodeStr;
			}

			var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
			var maxPos = $chars.length;
			var nonceStr = '';
			for (var i = 0; i < 8; i++) {
				nonceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
			}
			_this._hashCodeStr = nonceStr + new Date().getTime();
			return _this._hashCodeStr;
		};

		return _this;
	}

	/**
  * start listen
  * @param action { string }		     - the name of the action
  * @param callback  { Function }   - the callback function to receive data
  * @return {null}
  */


	/**
  * trigger the action
  * @param action { string } - the name of target action
  * @param data 	 { any }		- the data of action
  * @return { null }
  */


	/**
  * componentWillUnmount
  */


	/**
  * create hash code
  */


	return Actor;
}(_react.Component);
/**
 * [_actionRecords ]
 * @_actionRecords{
 * 		actionName1 : [function1, function2 ...]
 * }
 */


exports.default = Actor;
DataFrame.prototype._actionRecords = {};

/**
 * @_actionOwnerRecords
 * {
 * 		hashCode1 : { action : actionName, callback : function },
 * 		hashCode2 : { action : actionName, callback : function },
 * }
 */
DataFrame.prototype._actionOwnerRecords = {};