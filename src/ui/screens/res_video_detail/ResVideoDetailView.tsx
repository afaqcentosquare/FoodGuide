import React, {useState} from 'react';
import {
  FlatList,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { postObj } from "../../../models/res_model/PostModel";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { VideoSkeleton } from '../../components/shimmer/VideoSkeleton';
import { NoDataTxt } from "../../components/NoDataTxt";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VideoDetailItem } from "../video_detail/VideoDetailItem";
import strings from "../../../config/languages/LocalizedStrings";
import { NoMoreData } from "../../components/NoMoreData";
const {StatusBarManager} = NativeModules;

type Props = {
  onReachEnd : () => void,
  postVideoList : postObj[],
}

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 0 : 135

type videoDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ResVideoDetailView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<videoDetailNavProp>();
  const {themedColors} = usePreferredTheme();
  const { footerLoading,noMoreData,videoDataLoad} = useSelector((state: RootState) => state.Video);
  const [activeVideoIndex,setActiveVideoIndex] = useState(0);
  const {postVideoList} = props
  const Strings = strings;
  const {
    vdHeadTitleTxt,
    videoNoDataTxt,
    videoNoMoreDataTxt
  } = Strings

  function listSearchJobFooter()
  {
    return(
      <NoMoreData
        noDataTxt={videoNoMoreDataTxt}
        showError={noMoreData}
        loadData={footerLoading}/>
    )
  }

  return(
    <View style={styles.vdMainCont}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={themedColors.transparent}/>
      <View style={styles.vdMainCont}>
        {videoDataLoad &&
          <View style={styles.vdErrorCont}>
            <VideoSkeleton />
          </View>}
        {!videoDataLoad && props.postVideoList.length === 0 &&
          <View style={styles.vdErrorCont}>
            <NoDataTxt
              noDataTxt={videoNoDataTxt}/>
          </View>}
        {!videoDataLoad && props.postVideoList.length > 0 &&
          <View style={[styles.vdListCont,{backgroundColor:themedColors.bgColor}]}>
            <FlatList
              data={postVideoList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              decelerationRate={'fast'}
              snapToAlignment={'center'}
              onEndReachedThreshold={0.10}
              onEndReached={props.onReachEnd}
              ListFooterComponent={() => listSearchJobFooter()}
              onScroll={(e : any) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / (height - BOTTOM_HEIGHT))
                setActiveVideoIndex(index)
              }}
              renderItem={({item,index}) =>
                <VideoDetailItem
                  item={item}
                  isActive={activeVideoIndex === index}
                  length={postVideoList?.length}
                  index={index}/>}
              keyExtractor={(item, index) => index.toString()}/>
          </View>}
        <View style={styles.vdHeadMainCont}>
          <View style={styles.vdHeadSubCont}>
            <View style={styles.vdHeadTitleMainCont}>
              <View style={[styles.vdHeadTitleTxtCont,{backgroundColor:themedColors.cardBgColor}]}>
                <AppText
                  style={[styles.vdHeadTitleTxt,{color:themedColors.primaryTxtColor}]}
                  text={vdHeadTitleTxt}/>
              </View>
            </View>
            <View style={styles.vdBackIconMainCont}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.6}
                style={[styles.vdBackIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <AntDesign
                  name={"arrowleft"}
                  size={18}
                  color={themedColors.primaryIconColor}/>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                activeOpacity={0.6}
                style={[styles.vdHeadSearchIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <Ionicons
                  name={"search"}
                  size={18}
                  color={themedColors.primaryTxtColor}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  vdMainCont : {
    flex:1
  },
  vdListCont : {
    flex:1,
  },
  vdHeadMainCont : {
    marginTop:StatusBarManager.HEIGHT,
    width:'100%',
    flexDirection:'row',
    position:'absolute',
  },
  vdHeadSubCont : {
    flex:1,
    marginTop:Platform.OS === 'android' ? SPACE._2md : 0,
    flexDirection:'row'
  },
  vdErrorCont : {
    flex:1,
  },
  vdHeadSearchIconCont : {
    height:35,
    width:35,
    marginEnd:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  vdHeadTitleMainCont : {
    flex:1,
    height:40,
    width:'100%',
    position:'absolute',
    justifyContent:'center',
    alignItems:'center'
  },
  vdHeadTitleTxtCont : {
    borderRadius:BORDER_RADIUS._8xl,
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE._2xl,
    paddingEnd:SPACE._2xl,
  },
  vdHeadTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  vdBackIconMainCont : {
    flex:1
  },
  vdBackIconCont : {
    height:35,
    width:35,
    marginStart:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
})
