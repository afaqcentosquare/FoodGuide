import React, {useState} from 'react';
import {
  BackHandler,
  FlatList,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from '../../../config/colors';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import LottieView from "lottie-react-native";
import { AppText } from "../../components/AppText";
import { GILROY } from "../../../config";
import { VideoSkeleton } from '../../components/shimmer/VideoSkeleton';
import { NoDataTxt } from "../../components/NoDataTxt";
import { useNavigation } from "@react-navigation/native";
import { BookmarkVideoItem } from "./BookmarkVideoItem";
import { bookmarkObj } from "../../../models/res_model/BookmarkModel";
const {StatusBarManager} = NativeModules;

type Props = {
  onReachEnd : () => void,
  bookmarkList : bookmarkObj[],
}

type videoDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const BookmarkVideoView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<videoDetailNavProp>();
  const {themedColors} = usePreferredTheme();
  const { bookmarkFooterLoading,bookmarkNoMoreData,bookmarkVideoDataLoad} = useSelector((state: RootState) => state.BookmarkVideo);
  const [activeVideoIndex,setActiveVideoIndex] = useState(0);
  const {bookmarkList} = props

  function listSearchJobFooter()
  {
    return(
      <>
        {bookmarkFooterLoading && <View style={{ height: 60 }}>
          <LottieView source={require("../../../assets/images/pagination_loader.json")} autoPlay loop />
        </View>}
        {bookmarkNoMoreData &&
          <View style={{marginBottom:SPACE._2lg,justifyContent:'center',alignItems:'center',width:'100%' }}>
            <View style={{height:120,width:120}}>
              <LottieView source={require("../../../assets/images/no_more_data.json")} autoPlay loop />
            </View>
            <View>
              <AppText
                style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
                text={"No More Videos Found"}/>
            </View>
          </View>}
      </>

    )
  }

  return(
    <View style={{flex:1}}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"rgba(0,0,0,0)"}/>
      <View style={{flex:1}}>
        {bookmarkVideoDataLoad &&
          <View style={{ flex: 1 }}>
            <VideoSkeleton />
          </View>}
        {!bookmarkVideoDataLoad && props.bookmarkList.length === 0 &&
          <View style={{flex:1}}>
            <NoDataTxt
              noDataTxt={"No Videos Found"}/>
          </View>}
        {!bookmarkVideoDataLoad && props.bookmarkList.length > 0 &&
          <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
            <FlatList
              data={bookmarkList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              snapToAlignment={'center'}
              decelerationRate={'fast'}
              contentContainerStyle={{justifyContent:'center'}}
              onEndReachedThreshold={0.10}
              onEndReached={() => props.onReachEnd()}
              ListFooterComponent={() => listSearchJobFooter()}
              onScroll={(e : any) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / (height))
                setActiveVideoIndex(index)
              }}
              renderItem={({item,index}) =>
                <BookmarkVideoItem
                  item={item}
                  isActive={activeVideoIndex === index}
                  length={bookmarkList?.length}
                  index={index}/>}
              keyExtractor={(item, index) => index.toString()}/>
          </View>}
        <View style={{flex:1,flexDirection:'row',width:'100%',marginTop:StatusBarManager.HEIGHT,position:'absolute'}}>
          <View style={{height:40,width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',flex:1}}>
            <View style={{borderRadius:BORDER_RADIUS._8xl,paddingTop:SPACE._2md,paddingBottom:SPACE._2md,paddingStart:SPACE._2xl,paddingEnd:SPACE._2xl,backgroundColor:themedColors.cardBgColor}}>
              <AppText
                text={"Bookmark Videos"}/>
            </View>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
              style={{marginStart:SPACE._2lg,justifyContent:'center',alignItems:'center',borderRadius:BORDER_RADIUS._8xl,height:35,width:35,backgroundColor:themedColors.cardBgColor}}>
              <AntDesign
                name={"arrowleft"}
                size={18}
                color={themedColors.primaryTxtColor}/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.6}
              style={{marginEnd:SPACE._2lg,justifyContent:'center',alignItems:'center',borderRadius:BORDER_RADIUS._8xl,height:35,width:35,backgroundColor:themedColors.cardBgColor}}>
              <Ionicons
                name={"search"}
                size={18}
                color={themedColors.primaryTxtColor}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  profileHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
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
    flex:1,
    position:'absolute',
    marginStart:SPACE._2lg,

  },
  videoIconCont2 : {
    marginEnd:SPACE._2lg,
    marginBottom:SPACE._2xl,
    position:'absolute',
    bottom:0,
    right:0
  },
})
