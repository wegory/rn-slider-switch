import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    View,
    Platform
} from 'react-native';
import Button from './Button';
import styles from './styles';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class MultiSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false,
            position: new Animated.Value(0),
            posValue: 0,
            selectedPosition: 0,
            duration: 100,
            mainWidth: width - 30,
            switcherWidth: width / 2,
            thresholdDistance: width - 8 - width / 2
        };
        this.isParentScrollDisabled = false;
    }

    notStartedSelected = () => {
        Animated.timing(this.state.position, {
            useNativeDriver:true,
            toValue: Platform.OS === 'ios' ? -2 : 0,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue: Platform.OS === 'ios' ? -2 : 0,
                selectedPosition: 0
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Open');
    };

    completeSelected = () => {
        Animated.timing(this.state.position, {
            useNativeDriver:true,
            toValue:
                Platform.OS === 'ios'
                    ? this.state.mainWidth - this.state.switcherWidth
                    : this.state.mainWidth - this.state.switcherWidth - 2,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue:
                    Platform.OS === 'ios'
                        ? this.state.mainWidth - this.state.switcherWidth
                        : this.state.mainWidth - this.state.switcherWidth - 2,
                selectedPosition: 2
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Complete');
    };

    getStatus = (text) => {
        switch (this.state.selectedPosition) {
        case 0:
            return 'Open';
        case 2:
            return 'Complete';
        }
    };

    render() {
        const { fontFamily, fontColor, fontSize,switchColor, switchContainerColor, switchShadow, text1, text2} = this.props;
        return (
            <View style={[styles.container, {   backgroundColor: switchContainerColor}]}>
                <Button type="Open" onPress={this.notStartedSelected} fontFamily={fontFamily} fontColor={fontColor} fontSize={fontSize} text1={text1} text2={text2}/>
                <Button type="Complete" onPress={this.completeSelected} fontFamily={fontFamily} fontColor={fontColor} fontSize={fontSize} text1={text1} text2={text2}/>
                <Animated.View
                    useNativeDriver={true}
                    style={[
                        styles.switcher,
                        {
                            transform: [{ translateX: this.state.position }],
                            shadowColor: switchShadow,
                            backgroundColor: switchColor
                        }
                    ]}
                >
                    <Button type={this.getStatus()} fontFamily={fontFamily} fontColor={fontColor} fontSize={fontSize} text1={text1} text2={text2}/>
                </Animated.View>
            </View>
        );
    }
}

MultiSwitch.propTypes = {
    disableScroll: PropTypes.func,
    onStatusChanged: PropTypes.func,
    fontFamily: PropTypes.string,
    fontColor: PropTypes.string,
    fontSize: PropTypes.string,
    switchColor: PropTypes.string,
    switchContainerColor: PropTypes.string,
    switchShadow: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string
};
