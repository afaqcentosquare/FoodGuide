import React, {useState} from 'react';
import { FlatList, Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import colors from '../../../config/colors';
import { BORDER_RADIUS,SPACE } from "../../../config/Dimens";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { TextHeader } from "../../components/headers/TextHeader";
import { VideoItem } from "./VideoItem";
import { postObj } from "../../../models/res_model/PostModel";
import { VideoSkeleton } from '../../components/shimmer/VideoSkeleton';
import { NoDataTxt } from "../../components/NoDataTxt";
import { resProfileObj } from "../../../models/res_model/ResModel";
import { VideoResItem } from "./VideoResItem";
import strings from "../../../config/languages/LocalizedStrings";
import { NoMoreData } from "../../components/NoMoreData";

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 235 : 170

type Props = {
    onReachEnd : () => void,
    postVideoList : postObj[],
    resList : resProfileObj[],
    selectClick : (resId : string) => void
}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

export const VideoView = React.memo<Props>((props) =>
{
    const {themedColors} = usePreferredTheme();
    const {height} = useWindowDimensions();
    const {
        footerLoading,
        noMoreData,
        videoDataLoad
    } = useSelector((state: RootState) => state.Video);
    const [activeVideoIndex,setActiveVideoIndex] = useState(0);
    const {postVideoList} = props
    const Strings = strings;
    const {
        videoHeadTitleTxt,
        videoNoDataTxt,
        videoNoMoreDataTxt
    } = Strings

    function listSearchJobFooter()
    {
        return(
          <NoMoreData
            noDataTxt={videoNoMoreDataTxt}
            loadData={footerLoading}
            showError={noMoreData}/>
        )
    }

    return(
      <View style={[styles.videoMainCont,{backgroundColor:themedColors.bgColor}]}>
          <View style={[styles.videoHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
              <TextHeader
                titleTxtVisible={true}
                title={videoHeadTitleTxt}/>
              <View>
                  <FlatList
                    data={props.resList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index}) =>
                      <VideoResItem
                        selectClick={(resId) => props.selectClick(resId)}
                        item={item}
                        length={props.resList?.length}
                        index={index}/>}
                    keyExtractor={(item, index) => index.toString()}/>
              </View>
          </View>
          {!videoDataLoad && props.postVideoList.length > 0 &&
            <View style={styles.videoListCont}>
              <FlatList
                data={postVideoList}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                onEndReachedThreshold={0.9}
                onEndReached={() => props.onReachEnd()}
                ListFooterComponent={() => listSearchJobFooter()}
                onScroll={(e : any) => {
                    const index = Math.round(e.nativeEvent.contentOffset.y / (height - BOTTOM_HEIGHT))
                    setActiveVideoIndex(index)}}
                renderItem={({item,index}) =>
                  <VideoItem
                    item={item}
                    isActive={activeVideoIndex === index}
                    length={postVideoList?.length}
                    index={index}/>}
                keyExtractor={(item, index) => index.toString()}/>
            </View>}
          {videoDataLoad &&
            <View style={styles.videoErrCont}>
              <VideoSkeleton />
            </View>}
          {!videoDataLoad && props.postVideoList.length === 0 &&
            <View style={styles.videoErrCont}>
                <NoDataTxt
                    noDataTxt={videoNoDataTxt}/>
            </View>}
      </View>
    )
})

const styles = StyleSheet.create({
    videoMainCont : {
      flex:1,
    },
    videoListCont : {
        flex:1,
    },
    videoErrCont : {
        flex:1,
    },
    videoHeadMainCont : {
        paddingTop:SPACE._2md,
        paddingBottom:SPACE._2md,
        borderBottomLeftRadius:BORDER_RADIUS.xl,
        borderBottomRightRadius:BORDER_RADIUS.xl
    },
    videoIconSize : {
        flex:1,
        height:45,
        width:45,
        marginTop:SPACE._2lg,
        backgroundColor:colors.colors.transparent,
        borderRadius:120
    },
    videoPlayBtnCont : {
        flex:1,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:0,
        justifyContent:'center',
        alignItems:'center'
    },
    galleryItemPlayBtnTouchCont : {
        borderRadius:120,
        width:60,
        height:60,
        backgroundColor:colors.colors.yellow,
        justifyContent:'center',
        alignItems:'center'
    },
    videoIconMainCont : {
        flex:1,
    },
    videoBackIconCont : {
        position:'absolute',
        marginStart:SPACE._2lg,
    },
    videoIconCont2 : {
        marginEnd:SPACE._2lg,
        marginBottom:SPACE._2xl,
        position:'absolute',
        bottom:0,
        right:0
    }
})
