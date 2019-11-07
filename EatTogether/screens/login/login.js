import React, { Component } from 'react';
import {View, Text} from 'react-native'
// import PropTypes from 'prop-types';
import Logo from '../../components/login/Logo';
import Form from '../../components/login/Form';
import Wallpaper from '../../components/login/Wallpaper';
import ButtonSubmit from '../../components/login/ButtonSubmit';
import SignupSection from '../../components/login/SignupSection';

export default class LoginScreen extends Component {
    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form />
                <SignupSection />
                <ButtonSubmit />
            </Wallpaper>

        );
    }
}
