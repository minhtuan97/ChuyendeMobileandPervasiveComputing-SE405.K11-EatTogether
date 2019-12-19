import {
    createSwitchNavigator,
    createAppContainer
  } from 'react-navigation';
  import { createStackNavigator } from 'react-navigation-stack';
  
  import BlogHomeScreen from '../blog/BlogHomeScreen';
  
  const BlogStack = createStackNavigator(
    { 
      BlogHome: BlogHomeScreen,
    },
    {
      initialRouteName: 'BlogHome',
    },
  );
  
  export default BlogNavigator = createAppContainer(BlogStack);