var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import openDirectionShape from '../shapes/OpenDirectionShape';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import IconPositionShape from '../shapes/IconPositionShape';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isBeforeDay from '../utils/isBeforeDay';

import { START_DATE, END_DATE, ICON_BEFORE_POSITION, OPEN_DOWN } from '../constants';

var propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  isStartDateFocused: PropTypes.bool,

  endDate: momentPropTypes.momentObj,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  isEndDateFocused: PropTypes.bool,

  screenReaderMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  minimumNights: nonNegativeInteger,
  isOutsideRange: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  onDatesChange: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool
});

var defaultProps = {
  startDate: null,
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,

  endDate: null,
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  verticalSpacing: undefined,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  minimumNights: 1,
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !isInclusivelyAfterDay(day, moment());
    }

    return isOutsideRange;
  }(),
  displayFormat: function () {
    function displayFormat() {
      return moment.localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),

  onFocusChange: function () {
    function onFocusChange() {}

    return onFocusChange;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),
  onDatesChange: function () {
    function onDatesChange() {}

    return onDatesChange;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false
};

var DateRangePickerInputController = function (_React$Component) {
  _inherits(DateRangePickerInputController, _React$Component);

  function DateRangePickerInputController(props) {
    _classCallCheck(this, DateRangePickerInputController);

    var _this = _possibleConstructorReturn(this, (DateRangePickerInputController.__proto__ || Object.getPrototypeOf(DateRangePickerInputController)).call(this, props));

    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.onStartDateChange = _this.onStartDateChange.bind(_this);
    _this.onStartDateFocus = _this.onStartDateFocus.bind(_this);
    _this.onEndDateChange = _this.onEndDateChange.bind(_this);
    _this.onEndDateFocus = _this.onEndDateFocus.bind(_this);
    _this.clearDates = _this.clearDates.bind(_this);
    return _this;
  }

  _createClass(DateRangePickerInputController, [{
    key: 'onClearFocus',
    value: function () {
      function onClearFocus() {
        var _props = this.props,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose,
            startDate = _props.startDate,
            endDate = _props.endDate;


        onFocusChange(null);
        onClose({ startDate: startDate, endDate: endDate });
      }

      return onClearFocus;
    }()
  }, {
    key: 'onEndDateChange',
    value: function () {
      function onEndDateChange(endDateString) {
        var _props2 = this.props,
            startDate = _props2.startDate,
            isOutsideRange = _props2.isOutsideRange,
            minimumNights = _props2.minimumNights,
            keepOpenOnDateSelect = _props2.keepOpenOnDateSelect,
            onDatesChange = _props2.onDatesChange;


        var endDate = toMomentObject(endDateString, this.getDisplayFormat());

        var isEndDateValid = endDate && !isOutsideRange(endDate) && !(startDate && isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days')));
        if (isEndDateValid) {
          onDatesChange({ startDate: startDate, endDate: endDate });
          if (!keepOpenOnDateSelect) this.onClearFocus();
        } else {
          onDatesChange({
            startDate: startDate,
            endDate: null
          });
        }
      }

      return onEndDateChange;
    }()
  }, {
    key: 'onEndDateFocus',
    value: function () {
      function onEndDateFocus() {
        var _props3 = this.props,
            startDate = _props3.startDate,
            onFocusChange = _props3.onFocusChange,
            withFullScreenPortal = _props3.withFullScreenPortal,
            disabled = _props3.disabled;


        if (!startDate && withFullScreenPortal && !disabled) {
          // When the datepicker is full screen, we never want to focus the end date first
          // because there's no indication that that is the case once the datepicker is open and it
          // might confuse the user
          onFocusChange(START_DATE);
        } else if (!disabled) {
          onFocusChange(END_DATE);
        }
      }

      return onEndDateFocus;
    }()
  }, {
    key: 'onStartDateChange',
    value: function () {
      function onStartDateChange(startDateString) {
        var startDate = toMomentObject(startDateString, this.getDisplayFormat());

        var endDate = this.props.endDate;
        var _props4 = this.props,
            isOutsideRange = _props4.isOutsideRange,
            minimumNights = _props4.minimumNights,
            onDatesChange = _props4.onDatesChange,
            onFocusChange = _props4.onFocusChange;

        var isStartDateValid = startDate && !isOutsideRange(startDate);
        if (isStartDateValid) {
          if (startDate && isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days'))) {
            endDate = null;
          }

          onDatesChange({ startDate: startDate, endDate: endDate });
          onFocusChange(END_DATE);
        } else {
          onDatesChange({
            startDate: null,
            endDate: endDate
          });
        }
      }

      return onStartDateChange;
    }()
  }, {
    key: 'onStartDateFocus',
    value: function () {
      function onStartDateFocus() {
        if (!this.props.disabled) {
          this.props.onFocusChange(START_DATE);
        }
      }

      return onStartDateFocus;
    }()
  }, {
    key: 'getDisplayFormat',
    value: function () {
      function getDisplayFormat() {
        var displayFormat = this.props.displayFormat;

        return typeof displayFormat === 'string' ? displayFormat : displayFormat();
      }

      return getDisplayFormat;
    }()
  }, {
    key: 'getDateString',
    value: function () {
      function getDateString(date) {
        var displayFormat = this.getDisplayFormat();
        if (date && displayFormat) {
          return date && date.format(displayFormat);
        }
        return toLocalizedDateString(date);
      }

      return getDateString;
    }()
  }, {
    key: 'clearDates',
    value: function () {
      function clearDates() {
        var _props5 = this.props,
            onDatesChange = _props5.onDatesChange,
            reopenPickerOnClearDates = _props5.reopenPickerOnClearDates,
            onFocusChange = _props5.onFocusChange;

        onDatesChange({ startDate: null, endDate: null });
        if (reopenPickerOnClearDates) {
          onFocusChange(START_DATE);
        }
      }

      return clearDates;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props6 = this.props,
            startDate = _props6.startDate,
            startDateId = _props6.startDateId,
            startDatePlaceholderText = _props6.startDatePlaceholderText,
            isStartDateFocused = _props6.isStartDateFocused,
            endDate = _props6.endDate,
            endDateId = _props6.endDateId,
            endDatePlaceholderText = _props6.endDatePlaceholderText,
            isEndDateFocused = _props6.isEndDateFocused,
            screenReaderMessage = _props6.screenReaderMessage,
            showClearDates = _props6.showClearDates,
            showCaret = _props6.showCaret,
            showDefaultInputIcon = _props6.showDefaultInputIcon,
            inputIconPosition = _props6.inputIconPosition,
            customInputIcon = _props6.customInputIcon,
            customArrowIcon = _props6.customArrowIcon,
            customCloseIcon = _props6.customCloseIcon,
            disabled = _props6.disabled,
            required = _props6.required,
            readOnly = _props6.readOnly,
            openDirection = _props6.openDirection,
            isFocused = _props6.isFocused,
            phrases = _props6.phrases,
            onKeyDownArrowDown = _props6.onKeyDownArrowDown,
            onKeyDownQuestionMark = _props6.onKeyDownQuestionMark,
            isRTL = _props6.isRTL,
            noBorder = _props6.noBorder,
            block = _props6.block,
            small = _props6.small,
            verticalSpacing = _props6.verticalSpacing;


        var startDateString = this.getDateString(startDate);
        var endDateString = this.getDateString(endDate);

        return React.createElement(DateRangePickerInput, {
          startDate: startDateString,
          startDateId: startDateId,
          startDatePlaceholderText: startDatePlaceholderText,
          isStartDateFocused: isStartDateFocused,
          endDate: endDateString,
          endDateId: endDateId,
          endDatePlaceholderText: endDatePlaceholderText,
          isEndDateFocused: isEndDateFocused,
          isFocused: isFocused,
          disabled: disabled,
          required: required,
          readOnly: readOnly,
          openDirection: openDirection,
          showCaret: showCaret,
          showDefaultInputIcon: showDefaultInputIcon,
          inputIconPosition: inputIconPosition,
          customInputIcon: customInputIcon,
          customArrowIcon: customArrowIcon,
          customCloseIcon: customCloseIcon,
          phrases: phrases,
          onStartDateChange: this.onStartDateChange,
          onStartDateFocus: this.onStartDateFocus,
          onStartDateShiftTab: this.onClearFocus,
          onEndDateChange: this.onEndDateChange,
          onEndDateFocus: this.onEndDateFocus,
          onEndDateTab: this.onClearFocus,
          showClearDates: showClearDates,
          onClearDates: this.clearDates,
          screenReaderMessage: screenReaderMessage,
          onKeyDownArrowDown: onKeyDownArrowDown,
          onKeyDownQuestionMark: onKeyDownQuestionMark,
          isRTL: isRTL,
          noBorder: noBorder,
          block: block,
          small: small,
          verticalSpacing: verticalSpacing
        });
      }

      return render;
    }()
  }]);

  return DateRangePickerInputController;
}(React.Component);

export default DateRangePickerInputController;


DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;