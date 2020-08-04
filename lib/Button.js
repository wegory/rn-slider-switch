/* Switch Button Component class
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';



const Button = props => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.buttonStyle}
            >
                <Text style={{fontSize: props.fontSize, fontFamily: props.fontFamily, color: props.fontColor}}>{props.type === "Open" ? props.text1 : props.text2 }</Text>
            </TouchableOpacity>
        </View>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func
};

Button.defaultProps = {
    active: false
};

export default Button;
