(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var bemMixin = require('./bem');

var AppComponent = React.createClass({displayName: 'AppComponent',
  mixins: [bemMixin],
  render: function() {
    return (
      React.DOM.div({className: this.b_('-aa')}, 
        "Hello, world! I am an APP"
      )
    );
  }
});

React.renderComponent(
  AppComponent(null),
  document.getElementById('app')
);

},{"./bem":2}],2:[function(require,module,exports){
module.exports = {
  _getComponentNameFromDisplayName: function() {
    var displayName = !this.bemInheritedFrom
      ? this.constructor.displayName
      : this.bemInheritedFrom().constructor.displayName;
    return displayName.substring(0,1).toLowerCase() +
      displayName.substring(1);
  },
  getComponentName: function() {
    return this._componentName || (
      this._componentName = this._getComponentNameFromDisplayName()
    );
  },
  b_: function(bemStrings) {
    if (typeof bemStrings === 'undefined')
      return this.getComponentName();

    if (typeof bemStrings === 'string')
      bemStrings = [bemStrings];
    var modificatorSeparator = '_',
      elementSeparator = '-',
      bemNotation = {};

    bemStrings.forEach(function(bemString) {
      if (typeof bemString !== 'string') {
        bemNotation['wrongBemString'] = true;
        return;
      }
      var modSeparation = bemString.split(modificatorSeparator),
        elementSeparation = modSeparation[0].split(elementSeparator),
        modificator = modSeparation.length > 1 ? modSeparation[1] : null,
        element = elementSeparation.length > 1 ? elementSeparation[1] : null,
        block = elementSeparation[0] || this.getComponentName();

      modificator && !goog.object.isEmpty(this.state) && !this.state[modificator] && (modificator = null);
      bemNotation[block] = !element;
      bemNotation[block + modificatorSeparator + modificator] = !element && !!modificator;
      bemNotation[block + elementSeparator + element] = !!element;
      bemNotation[block + elementSeparator + element + modificatorSeparator + modificator] = !!element && !!modificator;
    }, this);

    return React.addons.classSet(bemNotation);
  },
  className: function(postfix) {
    return this.getComponentName() + (postfix || '');
  },
  classSet: function(classes) {
    var set = {};

    if (!classes) {
      classes = {
        root: true
      };
    }

    if (classes.root) {
      set[this.className()] = true;
      delete classes.root;

      var extClasses = this.props.className && this.props.className.split(' ') || [];
      set = goog.array.reduce(extClasses, function(set, name) {
        set[this.className(name)] = true;
        return set;
      }.bind(this), set);
    }

    goog.object.forEach((classes || {}), function(isEnabled, name) {
      set[this.className(name)] = isEnabled;
    }.bind(this));

    return React.addons.classSet(set);
  }
};

},{}]},{},[1])