import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, View} from 'react-native';
import colors from '../../../config/colors';
import { AppButton } from '../AppButton';
import {AppText} from '../AppText';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SPACE} from '../../../config/Dimens';
import {GILROY} from '../../../config';
import Strings from '../../../config/strings';

type Props = {
    videoDialogVisible : boolean,
    cancelVideoBtnClick : () => void,
    saveVideoBtnClick : () => void
}

export const SaveVideoDialog = React.memo<Props>((props) =>
{
    const saveVideoDialogTxt = Strings.saveVideoDialog;

    return(
        <Modal
            visible={props.videoDialogVisible}
            transparent
            animationType='fade'
            hardwareAccelerated>
            <View style={styles.saveVideoDailogMainCont}>
                <View style={styles.saveVideoDialogSubCont}>
                    <View>
                        <Image
                            style={styles.saveVideoDialogImg}
                            source={require('../../../assets/images/save_video_vector_img.jpg')}/>
                    </View>
                    <View style={styles.saveVideoDialogTxtCont}>
                        <AppText
                            style={styles.saveVideoDialogTxt}
                            text={saveVideoDialogTxt.saveVideoDialogTitleTxt}/>
                    </View>
                    <View style={styles.saveVideoDialogBtnCont}>
                        <View style={styles.saveVideoDialogBtnMarginEnd}>
                            <AppButton
                                onPress={() => props.saveVideoBtnClick()}
                                btnContStyle={styles.saveVideoDialogBtnHeight}
                                text={saveVideoDialogTxt.saveVideoDialogDeleteBtnTxt}/>
                        </View>
                        <View style={styles.savevideoDialogBtnMarginStart}>
                            <AppButton
                                onPress={() => props.cancelVideoBtnClick()}
                                btnContStyle={styles.saveVideoDialogBtnHeight}
                                text={saveVideoDialogTxt.saveVideoDialogCancelBtnTxt}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    saveVideoDailogMainCont: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.colors.transparent
    },
    saveVideoDialogSubCont: {
        backgroundColor:colors.colors.white,
        width : Dimensions.get('window').width / 2 * 1.3,
        borderRadius:8,
        paddingTop:25,
        paddingBottom:25,
        justifyContent:'center',
        alignItems:'center'
    },
    saveVideoDialogImg : {
        width:120,
        height:120
    },
    saveVideoDialogTxtCont : {
        marginTop:SPACE._2xl,
        marginEnd:SPACE._2lg,
        marginStart:SPACE._2lg,
        justifyContent:'center',
        alignItems:'center'
    },
    saveVideoDialogTxt : {
        fontFamily:GILROY.semi_bold,
        textAlign:'center'
    },
    saveVideoDialogBtnCont : {
        marginTop:SPACE._2lg,
        flexDirection:'row',
    },
    saveVideoDialogBtnMarginEnd : {
        flex:1,
        marginEnd:SPACE._2xs,
        marginStart:SPACE._2lg
    },
    savevideoDialogBtnMarginStart : {
        flex:1,
        marginStart:SPACE._2xs,
        marginEnd:SPACE._2lg
    },
    saveVideoDialogBtnHeight : {
        height:35
    }
})
