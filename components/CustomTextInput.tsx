import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
    name: string;
    control: Control<any, any>;
    placeholder: string;
    error?: string;
    protected?: boolean; // optional prop
};

const CustomInput = ({ name, control, placeholder, protected: isProtected = false }: Props) => {
    const [secure, setSecure] = useState(isProtected);

    return (
        <View>
            <Controller
                control={control}
                name={name}
                rules={{ required: `${name} is required` }}
                render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
                    <View>
                        <View style={styles.container}>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                placeholderTextColor="#C7C7C7"
                                style={styles.textInput}
                                secureTextEntry={secure}
                            />
                            {isProtected && (
                                <TouchableOpacity
                                    onPress={() => setSecure(prev => !prev)}
                                >
                                    <Ionicons
                                        name={secure ? 'eye-off' : 'eye'}
                                        size={20}
                                        color="#C7C7C7"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={styles.text}>{error?.message}</Text>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C7C7C7',
        borderRadius: 12,
        borderWidth: 1,
        paddingRight : 10
    },
    textInput: {
        color: 'white',
        padding: 10,
        flex : 1
    },
    text: {
        color: 'red',
        fontSize: 11,
        marginTop: 4,
    },
});

export default CustomInput;
