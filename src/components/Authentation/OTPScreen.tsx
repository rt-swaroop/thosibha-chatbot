import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../theme/colors';
import IconAssets from '../../assets/icons/IconAssets';

const OTPScreen = () => {
    const navigation = useNavigation<any>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === '') {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            if (text && index < 5) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <IconAssets.ArrowLeftDark width={24} height={24} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <IconAssets.Logo style={styles.logo} />
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Enter verification code</Text>
                    <Text style={styles.subtitle}>
                        Enter the 6-digit code sent to you into your account.
                    </Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            maxLength={1}
                            keyboardType="numeric"
                            ref={(ref) => {
                                if (ref) inputs.current[index] = ref;
                            }}
                        />
                    ))}
                </View>

                <View style={styles.actions}>
                    <Text style={styles.hintText}>Didn’t receive a sign-in request?</Text>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Resend request.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Try another method.</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default OTPScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background2,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingTop: 25,
    },
    backButton: {
        marginTop: 10,
        marginLeft: -8,
    },
    logo: {
        height: 40,
        width: 96,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.dark.subText,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    otpInput: {
        borderWidth: 2,
        borderColor: Colors.dark.primary,
        width: 48,
        height: 58,
        borderRadius: 8,
        marginHorizontal: 5,
        fontSize: 22,
        color: Colors.dark.text,
        textAlign: 'center',
    },
    actions: {
        marginTop: 50,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 14,
        color: Colors.dark.subText,
        marginBottom: 10,
    },
    linkText: {
        fontSize: 14,
        color: Colors.dark.primary,
        marginBottom: 12,
    },
});