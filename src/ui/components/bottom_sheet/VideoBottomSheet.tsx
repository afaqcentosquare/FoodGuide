import React, {useCallback, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../config/colors';
import {AppText} from '../AppText';
import {GalleryVideoItem} from '../../screens/camera/GalleryVideoItem';
import {FONT_SIZE, SPACE} from '../../../config/Dimens';
import {GILROY} from '../../../config';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
    isVideoSheetCloseClick : () => void,
    //videoGalleryList : videoObj[]
}

export const VideoBottomSheet = React.memo<Props>((props) =>
{
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["30%", "90%"], []);

    const handleClosePress = useCallback(() =>
    {
        bottomSheetRef.current?.forceClose();
    }, []);

    useFocusEffect(() =>
    {
        StatusBar.setHidden(false);
        return () => {
            StatusBar.setHidden(false);
        }
    })

    return(
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={false}>
            <View style={styles.cameraSheetHeadCont}>
                <TouchableOpacity
                    onPress={() => {
                        props.isVideoSheetCloseClick()
                        handleClosePress();
                    }}
                    activeOpacity={0.6}
                    style={styles.cameraSheetCloseIconCont}>
                    <Ionicons
                        name={"close"}
                        size={22}
                        color={colors.colors.black}/>
                </TouchableOpacity>
                <View style={styles.cameraSheetTitleCont}>
                    <AppText style={styles.cameraSheetTitleTxt} text={"Select Video"}/>
                </View>
            </View>
           {/* <BottomSheetFlatList
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                data={props.videoGalleryList}
                renderItem={({item,index}) =>
                    <GalleryVideoItem
                        videoSheetClose={props.isVideoSheetCloseClick}
                        item={item}/>}/>*/}
        </BottomSheet>
    )
})

const styles = StyleSheet.create({
    cameraSheetHeadCont : {
        flexDirection:'row',
        marginBottom:SPACE._2md
    },
    cameraSheetCloseIconCont : {
        marginStart:SPACE._2lg
    },
    cameraSheetTitleCont : {
        flex:1,
        left:0,
        right:0,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    cameraSheetTitleTxt : {
        fontFamily:GILROY.semi_bold,
        fontSize:FONT_SIZE.lg
    }
})
