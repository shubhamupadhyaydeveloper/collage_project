import { forwardRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title?: string;
  customBgColor?: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, isLoading, customBgColor, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity disabled={isLoading} activeOpacity={.8} ref={ref} {...touchableProps} style={[styles.button, touchableProps.style, { backgroundColor: customBgColor ?? '#0D9276' }]}>
      {isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
