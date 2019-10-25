/*Example of Reac Native Life Cycle*/
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class CustomComponent extends Component {
  
  // 1 Mounting Methods:
  
  // Hàm khởi tạo, chạy đầu tiên.
  // Thường để tạo State.
  constructor() {
    super();
    console.log('Constructor Called.');
  }
  // Gọi ngay sau constructor
  // Dùng để gọi các tác vụ bất đồng bộ hoặc gọi mạng.
  // Không dùng nửa sau ReactNative 0.6.0
  componentWillMount() {
    console.log('componentWillMount called.');
  }
  // Hàm vẽ UI Component
  render() {
    console.log('render called.');
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Language is: {this.props.name}</Text>
      </View>
    );
  }
  // Gọi sau hàm render
  // Dùng để gọi mạng.
  componentDidMount() {
    console.log('componentDidMount called.');
  }

  // 2 Updating Methods:
  // Dùng để update giá trị của Props hoặc State
  // Tự động được gọi khi re-render Component.

  // Gọi khi nhận Props
  // Không dùng nửa sau ReactNative 0.6.0
  componentWillReceiveProps(nextProp) {
    console.log('componentWillReceiveProps called.', nextProp);
  }
  // Gọi mỗi khi trước khi screen hay component cha re-render.
  // Có thể dừng render nếu return false
  shouldComponentUpdate(nextProp, nextState) {
    console.log('shouldComponentUpdate called.');
    return true;
  }
  // Nó được gọi trước khi kết xuất lại khi nhận được state hoặc props mới để cập nhật. 
  // Nó không cho phép phương thức this.setState ({}).
  // Không dùng nửa sau ReactNative 0.6.0
  componentWillUpdate(nextProp, nextState) {
    console.log('componentWillUpdate called.');
  }
  // Được gọi sau rending
  componentDidUpdate(prevProp, prevState) {
    console.log('componentDidUpdate called.');
  }

  // 3 Unmounting method:

  // Gọi khi component được xóa khởi DOM,
  // Có thể xóa ...
  componentWillUnmount() {
    console.log('componentWillUnmount called.');
  }

  // 4
  
  // Là một phần của hàm sửa lỗi 
  componentDidCatch(error, info) {
    console.log('componentDidCatch called.');
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CustomComponent name="C" />
      </View>
    );
  }
}
