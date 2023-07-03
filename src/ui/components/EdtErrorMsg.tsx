import React from 'react';
import {StyleSheet} from 'react-native';
import {GILROY} from '../../config';
import {FONT_SIZE} from '../../config/Dimens';
import colors from '../../config/colors';
import {AppText} from './AppText';

type Props = {
    edtErrorTxt : string
}

export const EdtErrorMsg = React.memo<Props>((props) =>
{
    return(
        <AppText
            style={styles.edtErrorTxt}
            text={props.edtErrorTxt}/>
    )
})

const styles = StyleSheet.create({
    edtErrorTxt : {
        fontFamily:GILROY.semi_bold,
        fontSize:FONT_SIZE.xs,
        marginTop:10,
        color:colors.red
    }
})
