var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getPhrase from '../utils/getPhrase';

import { BLOCKED_MODIFIER, DAY_SIZE } from '../constants';

function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  var hover = stylesObj.hover;

  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

var DayStyleShape = PropTypes.shape({
  background: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,

  hover: PropTypes.shape({
    background: PropTypes.string,
    border: PropTypes.string,
    color: PropTypes.string
  })
});

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases))
}));

var defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),

  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // internationalization
  phrases: CalendarDayPhrases
};

var CustomizableCalendarDay = function (_React$Component) {
  _inherits(CustomizableCalendarDay, _React$Component);

  function CustomizableCalendarDay() {
    var _ref;

    _classCallCheck(this, CustomizableCalendarDay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = CustomizableCalendarDay.__proto__ || Object.getPrototypeOf(CustomizableCalendarDay)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      isHovered: false
    };

    _this.setButtonRef = _this.setButtonRef.bind(_this);
    return _this;
  }

  _createClass(CustomizableCalendarDay, [{
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var _props = this.props,
            isFocused = _props.isFocused,
            tabIndex = _props.tabIndex;

        if (tabIndex === 0) {
          if (isFocused || tabIndex !== prevProps.tabIndex) {
            this.buttonRef.focus();
          }
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'onDayClick',
    value: function () {
      function onDayClick(day, e) {
        var onDayClick = this.props.onDayClick;

        onDayClick(day, e);
      }

      return onDayClick;
    }()
  }, {
    key: 'onDayMouseEnter',
    value: function () {
      function onDayMouseEnter(day, e) {
        var onDayMouseEnter = this.props.onDayMouseEnter;

        this.setState({ isHovered: true });
        onDayMouseEnter(day, e);
      }

      return onDayMouseEnter;
    }()
  }, {
    key: 'onDayMouseLeave',
    value: function () {
      function onDayMouseLeave(day, e) {
        var onDayMouseLeave = this.props.onDayMouseLeave;

        this.setState({ isHovered: false });
        onDayMouseLeave(day, e);
      }

      return onDayMouseLeave;
    }()
  }, {
    key: 'onKeyDown',
    value: function () {
      function onKeyDown(day, e) {
        var onDayClick = this.props.onDayClick;
        var key = e.key;

        if (key === 'Enter' || key === ' ') {
          onDayClick(day, e);
        }
      }

      return onKeyDown;
    }()
  }, {
    key: 'setButtonRef',
    value: function () {
      function setButtonRef(ref) {
        this.buttonRef = ref;
      }

      return setButtonRef;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this2 = this;

        var _props2 = this.props,
            day = _props2.day,
            ariaLabelFormat = _props2.ariaLabelFormat,
            daySize = _props2.daySize,
            isOutsideDay = _props2.isOutsideDay,
            modifiers = _props2.modifiers,
            tabIndex = _props2.tabIndex,
            renderDayContents = _props2.renderDayContents,
            styles = _props2.styles,
            _props2$phrases = _props2.phrases,
            chooseAvailableDate = _props2$phrases.chooseAvailableDate,
            dateIsUnavailable = _props2$phrases.dateIsUnavailable,
            defaultStylesWithHover = _props2.defaultStyles,
            outsideStylesWithHover = _props2.outsideStyles,
            todayStylesWithHover = _props2.todayStyles,
            highlightedCalendarStylesWithHover = _props2.highlightedCalendarStyles,
            blockedMinNightsStylesWithHover = _props2.blockedMinNightsStyles,
            blockedCalendarStylesWithHover = _props2.blockedCalendarStyles,
            blockedOutOfRangeStylesWithHover = _props2.blockedOutOfRangeStyles,
            hoveredSpanStylesWithHover = _props2.hoveredSpanStyles,
            selectedSpanStylesWithHover = _props2.selectedSpanStyles,
            lastInRangeStylesWithHover = _props2.lastInRangeStyles,
            selectedStartStylesWithHover = _props2.selectedStartStyles,
            selectedEndStylesWithHover = _props2.selectedEndStyles,
            selectedStylesWithHover = _props2.selectedStyles,
            afterHoveredStartStylesWithHover = _props2.afterHoveredStartStyles;
        var isHovered = this.state.isHovered;


        if (!day) return React.createElement('td', null);

        var formattedDate = { date: day.format(ariaLabelFormat) };

        var ariaLabel = modifiers.has(BLOCKED_MODIFIER) ? getPhrase(dateIsUnavailable, formattedDate) : getPhrase(chooseAvailableDate, formattedDate);

        var daySizeStyles = {
          width: daySize,
          height: daySize - 1
        };

        var useDefaultCursor = modifiers.has('blocked-minimum-nights') || modifiers.has('blocked-calendar') || modifiers.has('blocked-out-of-range');

        var selected = modifiers.has('selected') || modifiers.has('selected-start') || modifiers.has('selected-end');

        var hoveredSpan = !selected && (modifiers.has('hovered-span') || modifiers.has('after-hovered-start'));

        var isOutsideRange = modifiers.has('blocked-out-of-range');

        var defaultStyles = getStyles(defaultStylesWithHover, isHovered);
        var outsideStyles = getStyles(outsideStylesWithHover, isHovered);
        var todayStyles = getStyles(todayStylesWithHover, isHovered);
        var highlightedCalendarStyles = getStyles(highlightedCalendarStylesWithHover, isHovered);
        var blockedMinNightsStyles = getStyles(blockedMinNightsStylesWithHover, isHovered);
        var blockedCalendarStyles = getStyles(blockedCalendarStylesWithHover, isHovered);
        var blockedOutOfRangeStyles = getStyles(blockedOutOfRangeStylesWithHover, isHovered);
        var hoveredSpanStyles = getStyles(hoveredSpanStylesWithHover, isHovered);
        var selectedSpanStyles = getStyles(selectedSpanStylesWithHover, isHovered);
        var lastInRangeStyles = getStyles(lastInRangeStylesWithHover, isHovered);
        var selectedStartStyles = getStyles(selectedStartStylesWithHover, isHovered);
        var selectedEndStyles = getStyles(selectedEndStylesWithHover, isHovered);
        var selectedStyles = getStyles(selectedStylesWithHover, isHovered);
        var afterHoveredStartStyles = getStyles(afterHoveredStartStylesWithHover, isHovered);

        var hasCustomSelectedStyles = defaultStyles || selected && selectedStyles || modifiers.has('selected-start') && selectedStartStyles || modifiers.has('selected-end') && selectedEndStyles;
        var hasCustomHoveredStyles = modifiers.has('hovered-span') && hoveredSpanStyles || modifiers.has('after-hovered-start') && afterHoveredStartStyles;
        var hasCustomStyles = isOutsideDay && outsideStyles || modifiers.has('today') && todayStyles || modifiers.has('highlighted-calendar') && highlightedCalendarStyles || modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles || modifiers.has('blocked-calendar') && blockedCalendarStyles || modifiers.has('last-in-range') && lastInRangeStyles || modifiers.has('selected-span') && selectedSpanStyles || isOutsideRange && blockedOutOfRangeStyles || hasCustomSelectedStyles || hasCustomHoveredStyles;

        return React.createElement(
          'td',
          _extends({}, css.apply(undefined, [styles.CalendarDay, useDefaultCursor && styles.CalendarDay__defaultCursor, daySizeStyles].concat(_toConsumableArray(hasCustomStyles && [defaultStyles, isOutsideDay && outsideStyles, modifiers.has('today') && todayStyles, modifiers.has('highlighted-calendar') && highlightedCalendarStyles, modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles, modifiers.has('blocked-calendar') && blockedCalendarStyles, hoveredSpan && hoveredSpanStyles, modifiers.has('after-hovered-start') && afterHoveredStartStyles, modifiers.has('selected-span') && selectedSpanStyles, modifiers.has('last-in-range') && lastInRangeStyles, modifiers.has('selected-start') && selectedStartStyles, modifiers.has('selected-end') && selectedEndStyles, selected && selectedStyles, isOutsideRange && blockedOutOfRangeStyles]), _toConsumableArray(!hasCustomStyles && [styles.CalendarDay__default, isOutsideDay && styles.CalendarDay__outside, modifiers.has('today') && styles.CalendarDay__today, modifiers.has('highlighted-calendar') && styles.CalendarDay__highlighted_calendar, modifiers.has('blocked-minimum-nights') && styles.CalendarDay__blocked_minimum_nights, modifiers.has('blocked-calendar') && styles.CalendarDay__blocked_calendar, hoveredSpan && styles.CalendarDay__hovered_span, modifiers.has('selected-span') && styles.CalendarDay__selected_span, modifiers.has('last-in-range') && styles.CalendarDay__last_in_range, modifiers.has('selected-start') && styles.CalendarDay__selected_start, modifiers.has('selected-end') && styles.CalendarDay__selected_end, isOutsideRange && (blockedOutOfRangeStyles || styles.CalendarDay__blocked_out_of_range)]))), {
            role: 'button' // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
            , ref: this.setButtonRef,
            'aria-label': ariaLabel,
            onMouseEnter: function () {
              function onMouseEnter(e) {
                _this2.onDayMouseEnter(day, e);
              }

              return onMouseEnter;
            }(),
            onMouseLeave: function () {
              function onMouseLeave(e) {
                _this2.onDayMouseLeave(day, e);
              }

              return onMouseLeave;
            }(),
            onMouseUp: function () {
              function onMouseUp(e) {
                e.currentTarget.blur();
              }

              return onMouseUp;
            }(),
            onClick: function () {
              function onClick(e) {
                _this2.onDayClick(day, e);
              }

              return onClick;
            }(),
            onKeyDown: function () {
              function onKeyDown(e) {
                _this2.onKeyDown(day, e);
              }

              return onKeyDown;
            }(),
            tabIndex: tabIndex
          }),
          renderDayContents ? renderDayContents(day, modifiers) : day.format('D')
        );
      }

      return render;
    }()
  }]);

  return CustomizableCalendarDay;
}(React.Component);

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

export { CustomizableCalendarDay as PureCustomizableCalendarDay };
export default withStyles(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      font = _ref2$reactDates.font;
  return {
    CalendarDay: {
      boxSizing: 'border-box',
      cursor: 'pointer',
      fontSize: font.size,
      textAlign: 'center',

      ':active': {
        outline: 0
      }
    },

    CalendarDay__defaultCursor: {
      cursor: 'default'
    },

    CalendarDay__default: {
      border: '1px solid ' + String(color.core.borderLight),
      color: color.text,
      background: color.background,

      ':hover': {
        background: color.core.borderLight,
        border: '1px double ' + String(color.core.borderLight),
        color: 'inherit'
      }
    },

    CalendarDay__outside: {
      border: 0,

      background: color.outside.backgroundColor,
      color: color.outside.color
    },

    CalendarDay__blocked_minimum_nights: {
      background: color.minimumNights.backgroundColor,
      border: '1px solid ' + String(color.minimumNights.borderColor),
      color: color.minimumNights.color,

      ':hover': {
        background: color.minimumNights.backgroundColor_hover,
        color: color.minimumNights.color_active
      },

      ':active': {
        background: color.minimumNights.backgroundColor_active,
        color: color.minimumNights.color_active
      }
    },

    CalendarDay__highlighted_calendar: {
      background: color.highlighted.backgroundColor,
      color: color.highlighted.color,

      ':hover': {
        background: color.highlighted.backgroundColor_hover,
        color: color.highlighted.color_active
      },

      ':active': {
        background: color.highlighted.backgroundColor_active,
        color: color.highlighted.color_active
      }
    },

    CalendarDay__selected_span: {
      background: color.selectedSpan.backgroundColor,
      border: '1px solid ' + String(color.selectedSpan.borderColor),
      color: color.selectedSpan.color,

      ':hover': {
        background: color.selectedSpan.backgroundColor_hover,
        border: '1px solid ' + String(color.selectedSpan.borderColor),
        color: color.selectedSpan.color_active
      },

      ':active': {
        background: color.selectedSpan.backgroundColor_active,
        border: '1px solid ' + String(color.selectedSpan.borderColor),
        color: color.selectedSpan.color_active
      }
    },

    CalendarDay__last_in_range: {
      borderRight: color.core.primary
    },

    CalendarDay__selected: {
      background: color.selected.backgroundColor,
      border: '1px solid ' + String(color.selected.borderColor),
      color: color.selected.color,

      ':hover': {
        background: color.selected.backgroundColor_hover,
        border: '1px solid ' + String(color.selected.borderColor),
        color: color.selected.color_active
      },

      ':active': {
        background: color.selected.backgroundColor_active,
        border: '1px solid ' + String(color.selected.borderColor),
        color: color.selected.color_active
      }
    },

    CalendarDay__hovered_span: {
      background: color.hoveredSpan.backgroundColor,
      border: '1px solid ' + String(color.hoveredSpan.borderColor),
      color: color.hoveredSpan.color,

      ':hover': {
        background: color.hoveredSpan.backgroundColor_hover,
        border: '1px solid ' + String(color.hoveredSpan.borderColor),
        color: color.hoveredSpan.color_active
      },

      ':active': {
        background: color.hoveredSpan.backgroundColor_active,
        border: '1px solid ' + String(color.hoveredSpan.borderColor),
        color: color.hoveredSpan.color_active
      }
    },

    CalendarDay__blocked_calendar: {
      background: color.blocked_calendar.backgroundColor,
      border: '1px solid ' + String(color.blocked_calendar.borderColor),
      color: color.blocked_calendar.color,

      ':hover': {
        background: color.blocked_calendar.backgroundColor_hover,
        border: '1px solid ' + String(color.blocked_calendar.borderColor),
        color: color.blocked_calendar.color_active
      },

      ':active': {
        background: color.blocked_calendar.backgroundColor_active,
        border: '1px solid ' + String(color.blocked_calendar.borderColor),
        color: color.blocked_calendar.color_active
      }
    },

    CalendarDay__blocked_out_of_range: {
      background: color.blocked_out_of_range.backgroundColor,
      border: '1px solid ' + String(color.blocked_out_of_range.borderColor),
      color: color.blocked_out_of_range.color,

      ':hover': {
        background: color.blocked_out_of_range.backgroundColor_hover,
        border: '1px solid ' + String(color.blocked_out_of_range.borderColor),
        color: color.blocked_out_of_range.color_active
      },

      ':active': {
        background: color.blocked_out_of_range.backgroundColor_active,
        border: '1px solid ' + String(color.blocked_out_of_range.borderColor),
        color: color.blocked_out_of_range.color_active
      }
    },

    CalendarDay__selected_start: {},
    CalendarDay__selected_end: {},
    CalendarDay__today: {}
  };
})(CustomizableCalendarDay);