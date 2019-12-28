import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import BlogHomeScreen from '../blog/BlogHomeScreen'
import CreateBlogScreen from '../blog/CreateBlogScreen'

const BlogStack = createStackNavigator(
  { 
    BlogHome: BlogHomeScreen,
    BlogCreate: CreateBlogScreen,
  },
  {
    initialRouteName: 'BlogHome',
  },
)

export default BlogNavigator = createAppContainer(BlogStack)