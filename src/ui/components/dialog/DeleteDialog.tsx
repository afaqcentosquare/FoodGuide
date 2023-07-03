import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, View} from 'react-native';
import {AppText} from '../AppText';
import {GILROY} from '../../../config';
import {SPACE} from '../../../config/Dimens';
import {AppButton} from '../AppButton';
import colors from '../../../config/colors';
import Strings from '../../../config/strings';

type Props = {
    deleteDialogVisible : boolean,
    cancelDeleteBtnClick : () => void,
    deleteVideoBtnClick : () => void
}

export const DeleteDialog = React.memo<Props>((props) =>
{
    const deleteDialogTxt = Strings.deleteVideoDialog;

    return(
        <Modal
            visible={props.deleteDialogVisible}
            transparent
            animationType='fade'
            hardwareAccelerated>
            <View style={styles.deletDialogMainCont}>
                <View style={styles.deleteDialogSubCont}>
                    <View>
                        <Image
                            style={styles.deleteDialogImg}
                            source={require('../../../assets/images/delete_vector_img.jpg')}/>
                    </View>
                    <View style={styles.deleteDialogTxtCont}>
                        <AppText
                            style={styles.deleteDialogTxt}
                            text={deleteDialogTxt.deleteDialogTitleTxt}/>
                    </View>
                    <View style={styles.deleteDialogBtnCont}>
                        <View style={styles.deleteDialogBtnMarginEnd}>
                            <AppButton
                                onPress={() => props.deleteVideoBtnClick()}
                                btnContStyle={styles.deleteDialogBtnHeight}
                                text={deleteDialogTxt.deleteDialogDeleteBtnTxt}/>
                        </View>
                        <View style={styles.deleteDialogBtnMarginStart}>
                            <AppButton
                                onPress={() => props.cancelDeleteBtnClick()}
                                btnContStyle={styles.deleteDialogBtnHeight}
                                text={deleteDialogTxt.deleteDialogCancelBtnTxt}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    deletDialogMainCont: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.transparent
    },
    deleteDialogSubCont: {
        backgroundColor:colors.white,
        width : Dimensions.get('window').width / 2 * 1.3,
        borderRadius:8,
        paddingTop:25,
        paddingBottom:25,
        justifyContent:'center',
        alignItems:'center'
    },
    deleteDialogImg : {
        width:120,
        height:120
    },
    deleteDialogTxtCont : {
        marginTop:SPACE._2xl,
        marginEnd:SPACE._2lg,
        marginStart:SPACE._2lg,
        justifyContent:'center',
        alignItems:'center'
    },
    deleteDialogTxt : {
        fontFamily:GILROY.semi_bold,
        textAlign:'center'
    },
    deleteDialogBtnCont : {
        marginTop:SPACE._2lg,
        flexDirection:'row',
    },
    deleteDialogBtnMarginEnd : {
        flex:1,
        marginEnd:SPACE._2xs,
        marginStart:SPACE._2lg
    },
    deleteDialogBtnMarginStart : {
        flex:1,
        marginStart:SPACE._2xs,
        marginEnd:SPACE._2lg
    },
    deleteDialogBtnHeight : {
        height:35
    }
})
