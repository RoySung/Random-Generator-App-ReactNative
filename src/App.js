import { TabNavigator } from 'react-navigation';

import * as Pages from 'RandomGeneratorApp/src/pages';

export default TabNavigator({
  // home: {
  //   screen: Pages.Home,
  // },
  numbers: {
    screen: Pages.Numbers,
  },
  customList: {
    screen: Pages.CustomList,
  }
}, {
  initialRouteName: 'numbers',
});
