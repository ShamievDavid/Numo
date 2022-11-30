import {TodayScreen, HistoryScreen} from '../../Screens';
import {Zip, ZipFilled, Clock, ClockFilled} from '../../../assets';

export default [
  {
    name: 'Today',
    screen: TodayScreen,
    icon: {
      default: <Zip />,
      active: <ZipFilled />,
    },
  },
  {
    name: 'History',
    screen: HistoryScreen,
    icon: {
      default: <Clock />,
      active: <ClockFilled />,
    },
  },
];
