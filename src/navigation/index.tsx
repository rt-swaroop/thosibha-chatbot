import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTE_NAMES } from './constants';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import AiAssistScreen from '../screens/AiAssist/AiAssistScreen';
import SettingsScreen from '../components/Settings/settings';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';
import CheckEmailScreen from '../screens/ForgotPassword/CheckEmailScreen';
import ResetPassword from '../screens/ForgotPassword/ResetPassword';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { state, setNavigationRef } = useAuth();

    const needsPasswordReset = state.tokens?.password_change_required === true;

    return (
        <NavigationContainer ref={setNavigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
                initialRouteName={state.isAuthenticated ? (needsPasswordReset ? ROUTE_NAMES.ResetPassword : ROUTE_NAMES.Home) : ROUTE_NAMES.Login}
            >
                {state.isAuthenticated ? (
                    needsPasswordReset ? (
                        <Stack.Screen
                            name={ROUTE_NAMES.ResetPassword}
                            component={ResetPassword}
                            options={{
                                gestureEnabled: false,
                            }}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name={ROUTE_NAMES.Home}
                                component={HomeScreen}
                                options={{
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name={ROUTE_NAMES.AiAssist}
                                component={AiAssistScreen}
                                options={{
                                    gestureEnabled: true,
                                }}
                            />
                            <Stack.Screen
                                name={ROUTE_NAMES.Settings}
                                component={SettingsScreen}
                                options={{
                                    gestureEnabled: true,
                                }}
                            />
                            <Stack.Screen
                                name={ROUTE_NAMES.ResetPassword}
                                component={ResetPassword}
                                options={{
                                    gestureEnabled: true,
                                }}
                            />
                        </>
                    )
                ) : (
                    <>
                        <Stack.Screen
                            name={ROUTE_NAMES.Login}
                            component={LoginScreen}
                            options={{
                                gestureEnabled: false,
                            }}
                        />
                        <Stack.Screen name={ROUTE_NAMES.ForgotPassword} component={ForgotPasswordScreen} />
                        <Stack.Screen name={ROUTE_NAMES.CheckEmail} component={CheckEmailScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;