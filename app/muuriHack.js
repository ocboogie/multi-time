import Muuri from "muuri";

// TODO: Make this less hacky

/* eslint-disable no-underscore-dangle */
const origRefreshDimensions = Muuri.prototype._refreshDimensions;
// eslint-disable-next-line func-names
Muuri.prototype._refreshDimensions = function() {
  // eslint-disable-next-line func-names
  const func = function() {
    let width = 0;
    for (let i = 0; i < this._items.length; i += 1) {
      const item = this._items[i];
      if (item._top === 0 && item.isVisible()) {
        width += item._width + item._margin.left + item._margin.right;
      }
    }
    this._element.style.width = `${width}px`;
  };
  setTimeout(func.bind(this), 10);
  return origRefreshDimensions.call(this);
};
/* eslint-enable no-underscore-dangle */
