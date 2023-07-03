import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import colors from '../../../config/colors';
import {AppText} from '../AppText';
import {GILROY} from '../../../config';
import {FONT_SIZE} from '../../../config/Dimens';

type Props = {
    dialogVisible : boolean
}

export const DialogComponent = React.memo<Props>((props) =>
{
    return(
        <Modal
            visible={props.dialogVisible}
            transparent
            animationType='fade'
            hardwareAccelerated>
            <View style={styles.dialogMainContainer}>
                <View style={styles.dialogSubContainer}>
                    <AppText
                        style={styles.dialogTxt}
                        text={'Processing'}/>
                    <ActivityIndicator
                        animating={props.dialogVisible}
                        size="large"
                        color="red"
                        style={styles.dialogProgress}/>
                </View>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    dialogMainContainer:
        {
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'transparent'
        },

    dialogSubContainer:
        {
            backgroundColor:colors.white,
            borderRadius:8,
            paddingStart:50,
            paddingEnd: 50,
            paddingTop:25,
            paddingBottom:25,
            justifyContent:'center',
            alignItems:'center'
        },

    dialogTxt:
        {
            fontFamily: GILROY.semi_bold,
            fontSize: FONT_SIZE.xl
        },

    dialogTxtContainer:
        {
            justifyContent:'center',
            alignItems:'center'
        },

    dialogProgress:
        {
            paddingTop: 25
        },
})
