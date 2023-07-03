import React from 'react';
import colors from '../../config/colors';
import {Image, SafeAreaView, StatusBar, StyleSheet,View} from 'react-native';
import {FONT_SIZE, SPACE} from '../../config/Dimens';
import {AppText} from './AppText';
import {GILROY} from '../../config';
import {AppButton} from './AppButton';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../routes/all_routes/AllScreenStack';
import {useNavigation} from '@react-navigation/native';
import Strings from '../../config/strings';

type Props = {
    getPermission : () => void
}

type noPermissionNavProp = StackNavigationProp<AllScreenStackParamList>;

export const NoPermissionView = React.memo<Props>((props) =>
{
    const navigation = useNavigation<noPermissionNavProp>();
    const noPerString = Strings.noPermission;

    return(
        <SafeAreaView style={styles.noPerMainCont}>
            <StatusBar barStyle={'light-content'}/>
            <View style={styles.noPerSubCont}>
                <View>
                    <Image
                        style={styles.noPerImg}
                        source={require('../../assets/images/permission_vector.jpg')}/>
                </View>
                <View style={styles.noPerTxtCont1}>
                    <AppText
                        style={styles.noPerTxtCont1Txt}
                        text={noPerString.noPerTitle}/>
                </View>
                <View style={styles.noPerTxtCont2}>
                    <AppText
                        style={styles.noPerTxtCont2Txt}
                        text={noPerString.noPerDes}/>
                </View>
                <View style={styles.noPerBtnMainCont}>
                    <AppButton
                        onPress={() => props.getPermission()}
                        btnContStyle={styles.noPerBtnCont}
                        text={noPerString.noPerBtnTxt}/>
                </View>
            </View>


        </SafeAreaView>


    )
})

const styles = StyleSheet.create({
    noPerMainCont : {
        flex:1,
        backgroundColor:colors.transparent,
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,

    },
    noPerSubCont : {
        flex:1,
        backgroundColor:colors.white,
        marginTop:SPACE._4xl,
        marginBottom:SPACE._4xl,
        marginStart:SPACE.lg,
        marginEnd:SPACE.lg,
        borderRadius:18,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:SPACE._4xl,
        paddingBottom:SPACE._4xl
    },
    noPerImg : {
        width:180,
        height:180,
        borderRadius:120
    },
    noPerTxtCont1 : {
        marginTop:SPACE._3xl
    },
    noPerTxtCont1Txt : {
        fontFamily:GILROY.bold,
        fontSize:FONT_SIZE.xl
    },
    noPerTxtCont2 : {
        marginTop:SPACE.sm,
        marginStart:SPACE._2xl,
        marginEnd:SPACE._2xl
    },
    noPerTxtCont2Txt : {
        textAlign:'center',
        fontFamily:GILROY.semi_bold,
        fontSize:FONT_SIZE._2xs,
        color:colors.textColor
    },
    noPerBtnMainCont : {
        marginTop:SPACE.xl
    },
    noPerBtnCont : {
        paddingStart:SPACE._2xl,
        paddingEnd:SPACE._2xl,
        height:40
    }

})
