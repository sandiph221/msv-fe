import React, { useRef } from 'react';
import {
  Button,
  makeStyles,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  subDays,
  endOfWeek,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  subYears,
} from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomDateRangeAction } from '../../store/actions/SocialMediaProfileAction';
import { CustomButton } from '../CustomButton/CustomButton';
import moment from 'moment-timezone';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: '#fff',
    marginLeft: 'auto',
    width: 180,
  },
  filterSelect: {
    fontSize: 15,
    paddingLeft: 25,
    background: '#fff',
    width: '100%',
  },
  dateIcon: {
    position: 'absolute',
    marginLeft: 7,
    padding: 2,
    zIndex: 5,
  },
}));

const TopFilter = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [customDate, setCustomDate] = React.useState(false);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const miniXs = useMediaQuery('(max-width:375px)');

  let customDateRange = [
    {
      label: 'Today',
      hasCustomRendering: true,
      range: () => ({
        startDate: new Date(),
        endDate: new Date(),
        ranged: 'Today',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'Yesterday',
      hasCustomRendering: true,
      range: () => ({
        startDate: subDays(new Date(), 1),
        endDate: new Date(),
        ranged: 'Yesterday',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'This week',
      hasCustomRendering: true,
      range: () => ({
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date()),
        ranged: 'This week',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'Last 7 days',
      hasCustomRendering: true,
      range: () => ({
        startDate: subDays(new Date(), 6),
        endDate: new Date(),
        ranged: 'Last 7 days',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'This month',
      hasCustomRendering: true,
      range: () => ({
        startDate: startOfMonth(new Date(), 1),
        endDate: endOfMonth(new Date()),
        ranged: 'This month',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'Last month',
      hasCustomRendering: true,
      range: () => ({
        startDate: startOfMonth(addMonths(new Date(), -1)),
        endDate: endOfMonth(addMonths(new Date(), -1)),
        ranged: 'Last month',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'Last 30 days',
      hasCustomRendering: true,
      range: () => ({
        startDate: subDays(new Date(), 30),
        endDate: new Date(),
        ranged: 'Last 30 days',
      }),
      isSelected() {
        return false;
      },
    },
    {
      label: 'Last 1 year',
      hasCustomRendering: true,
      range: () => ({
        startDate: subYears(new Date(), 1),
        endDate: new Date(),
        ranged: 'Last 1 year',
      }),
      isSelected() {
        return false;
      },
    },
  ];

  const { customDateRangeRed } = useSelector(
    (state) => state.socialMediaProfileListReducer
  );
  const [stateDate, setStateDate] = React.useState([]);
  const [initialStateDate, setInitialStateDate] = React.useState([]);

  const dateRef = useRef(null);

  React.useEffect(() => {
    if (customDateRangeRed) {
      setStateDate(customDateRangeRed);
      setInitialStateDate(customDateRangeRed);
    }
  }, [customDateRangeRed]);

  const customClick = () => {
    setCustomDate(!customDate);
    setStateDate(initialStateDate);
  };

  const handleClickAway = () => {
    setCustomDate(false);
    setStateDate(initialStateDate);
  };

  const handleDateChange = () => {
    const convertedDate = stateDate.map((sd) => ({
      ...sd,
      startDate: moment(sd.startDate).format('YYYY-MM-DD'),
      endDate: moment(sd.endDate).format('YYYY-MM-DD'),
    }));
    setInitialStateDate(stateDate);
    dispatch(setCustomDateRangeAction(convertedDate));
    setCustomDate(false);
  };
  const renderStaticRange = (range) => {
    return <p>{range.label}</p>;
  };

  const onChangeDate = (item) => {
    setStateDate([item.selection]);
  };

  const formatDate = (date) => moment(date).format('YYYY-MM-DD');
  const dateFunc = () => {
    if (stateDate && stateDate.length !== 0) {
      if (
        formatDate(stateDate[0].startDate) ===
          formatDate(stateDate[0].endDate) &&
        formatDate(stateDate[0].endDate) === formatDate(moment())
      ) {
        return 'Today';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().subtract(1, 'day')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment())
      ) {
        return 'Yesterday';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().startOf('week')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment().endOf('week'))
      ) {
        return 'This Week';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().subtract(6, 'day')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment())
      ) {
        return 'Last 7 days';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().startOf('month')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment().endOf('month'))
      ) {
        return 'This month';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().subtract(1, 'month').startOf('month')) &&
        formatDate(stateDate[0].endDate) ===
          formatDate(moment().subtract(1, 'month').endOf('month'))
      ) {
        return 'Last month';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().subtract(30, 'day')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment())
      ) {
        return 'Last 30 days';
      } else if (
        formatDate(stateDate[0].startDate) ===
          formatDate(moment().subtract(365, 'day')) &&
        formatDate(stateDate[0].endDate) === formatDate(moment())
      ) {
        return 'Last 1 year';
      } else {
        return 'Custom';
      }
    }
  };

  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      touchEvent='onTouchStart'
      onClickAway={handleClickAway}
    >
      <div
        style={{ position: miniXs ? 'initial' : 'relative', height: '100%' }}
      >
        <Button
          variant='outlined'
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            background: '#fff',
            marginLeft: props.xs ? 'inHerit' : 'auto',
            width: xs ? 150 : 180,
            height: '100%',
            textTransform: 'capitalize',
          }}
          startIcon={<DateRangeIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={() => customClick()}
          title='button'
        >
          {dateFunc()}
        </Button>
        <div
          id='material-date-range'
          style={{ right: miniXs ? 10 : 0 }}
        >
          {customDate && (
            <DateRangePicker
              ref={dateRef}
              fixedHeight={true}
              onChange={(item) => onChangeDate(item)}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={stateDate.map((sd) => ({
                ...sd,
                startDate: new Date(sd.startDate),
                endDate: new Date(sd.endDate),
              }))}
              direction={xs ? 'vertical' : 'horizontal'}
              retainEndDateOnFirstSelection={true}
              inputRanges={[]}
              renderStaticRangeLabel={(definedRange) =>
                renderStaticRange(definedRange)
              }
              showPreview={false}
              rangeColors={['#FFF8DE']}
              color={'#323132'}
              staticRanges={customDateRange}
            />
          )}
          {customDate && (
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 40,
                zIndex: 999999,
              }}
            >
              <CustomButton
                defaultBackgroundColor
                onClick={handleDateChange}
              >
                Apply
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default TopFilter;
