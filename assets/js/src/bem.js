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
