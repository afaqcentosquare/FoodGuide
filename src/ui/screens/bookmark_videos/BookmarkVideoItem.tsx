import React, { useEffect, useRef, useState } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { ActivityIndicator, Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Video, { OnBufferData } from "react-native-video";
import Helper from "../../../helper/Helper";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";
import { AppText } from "../../components/AppText";
import { GILROY, MONTSERRAT } from "../../../config";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { postObj } from "../../../models/res_model/PostModel";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../../redux";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { setIsVideoLoad } from "../../../redux/slice/VideoSlice";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { bookmarkObj } from "../../../models/res_model/BookmarkModel";

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 10 : 165

type Props = {
  index : number,
  length : number,
  item : bookmarkObj,
  isActive : any
}

type postNavProp = StackNavigationProp<AllScreenStackParamList>;

export const BookmarkVideoItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<postNavProp>();
  //const { postVideo,postDes,postThumbNail,postKey,postUserId,foodId,resId,parentCatId } = props.item

  const [foodId,setFoodId] = useState('');
  const [resId,setResId] = useState('');
  const [parentCatId,setParentCatId] = useState('');
  const [postVideo,setPostVideo] = useState('');
  const [postDes,setPostDes] = useState('');
  const [postThumbNail,setPostThumbNail] = useState('');
  const [postUserId,setPostUserId] = useState('');
  const [postKey,setPostKey] = useState('');
  const [postLocation,setPostLocation] = useState('')


  const { isVideoLoad } = useSelector((state: RootState) => state.Video);

  //------------ res data --------------------

  const [resName,setResName] = useState('')
  const [resImg,setResImg] = useState('')
  const [resLoc,setResLoc] = useState('');

  //------------ food data --------------------
  const [foodRating,setFoodRating] = useState(0)
  const [foodCatName,setFoodCatName] = useState('')
  const [foodPrice,setFoodPrice] = useState('');
  const [foodName,setFoodName] = useState('');
  const [foodImg,setFoodImg] = useState('');
  const [foodDes,setFoodDes] = useState('');

  //------------ video like --------------------
  const [isPostLike,setIsPostLike] = useState(false);
  const [postLikeCount,setPostLikeCount] = useState(0);
  const player = useRef<Video>(null);
  const [bookmarkCount,setBookmarkCount] = useState(0);
  const [reviewCount,setReviewCount] = useState(0);
  const [isBookmark,setIsBookmark] = useState(0);
  //const [isPaused,setIsPaused] = useState(props.isActive);

  function getResData()
  {
    Helper.getRestaurantData(postUserId)
      .then((result : any) =>
      {
        setResName(result.name)
        setResImg(result.resImg)
        setResLoc(result.location)
      })
  }

  const onBuffer = (buffer : OnBufferData) =>
  {
    if(buffer.isBuffering)
    {
      setIsVideoLoad(true)
    }
    else
    {
      setIsVideoLoad(false)
    }
    //console.log("onBuffer : " + e.isBuffering)
  }

  function getFoodData(foodId : string,parentCatId : string,resId : string)
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        setFoodImg(result.foodImg)
        setFoodName(result.foodName)
        setFoodCatName(result.foodCatName)
        setFoodRating(result.foodRating)
        setFoodPrice(result.foodPrice)
        setFoodDes(result.foodDes)
      })
  }

  function getPostLikes(postKey : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Post")
          .child(postKey)
          .child(userId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setIsPostLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function postLike(postKey :string,resId : string)
  {
    Helper.postLike(postKey,resId)
      .then((result : any) =>
      {
        getPostLikes(postKey)
      })
  }

  function removePostLike(postKey : string)
  {
    Helper.removePostLike(postKey)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getPostLikes(postKey)
        }
      })
  }

  function checkPostLikes(postKey : string,resId : string)
  {
    Helper.checkPostLikes(postKey)
      .then((result : any) =>
      {
        if (result === null)
        {
          postLike(postKey,resId)
        }
        else
        {
          removePostLike(postKey)
        }
      })
  }

  function getPostLikeCount()
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Post")
          .child(postKey)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setPostLikeCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function getReviewCount()
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Reviews")
          .child("Food")
          .child(foodId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setReviewCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function postBookmark(postKey : string)
  {
    Helper.postBookmark(postKey)
      .then((result : any) =>
      {
        getBookmark(postKey)
      })
  }

  function getBookmark(postKey : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Bookmark")
          .child(postKey)
          .child(userId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setIsBookmark(showDataSnap.child("isSaved").val())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function removeBookmark(postKey : string)
  {
    Helper.removeBookmark(postKey)
      .then((result : any) =>
      {
        if(result === 'isSuccessfull')
        {
          getBookmark(postKey)
        }
      })
  }

  function checkBookmark(postKey : string)
  {
    Helper.checkBookmark(postKey)
      .then((result : any) =>
      {
        if (result === null)
        {
          postBookmark(postKey)
        }
        else
        {
          removeBookmark(postKey)
        }
      })
  }

  function getBookmarkCount(postKey : string)
  {
    try
    {
      const showDataRef =
        database().ref()
          .child("Bookmark")
          .child(postKey)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setBookmarkCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  /*function getBookmarkPostData()
  {
    const userId : any = auth().currentUser?.uid;
    const postRef =
      database()
        .ref()
        .child("Post")
    postRef.on('value',(postSnap)  =>
    {
      // @ts-ignore
      postSnap.forEach((postChildSnap) =>
      {
        setFoodId(postChildSnap.child("foodId").val())
        setParentCatId(postChildSnap.child("parentCatId").val())
        setPostDes(postChildSnap.child("postDes").val())
        setPostKey(postChildSnap.child("postKey").val())
        setPostLocation(postChildSnap.child("postLocation").val())
        setPostThumbNail(postChildSnap.child("postThumbNail").val())
        setPostUserId(postChildSnap.child("postUserId").val())
        setPostVideo(postChildSnap.child("postVideo").val())
        setResId(postChildSnap.child("resId").val())

        getFoodData(postChildSnap.child("foodId").val(),postChildSnap.child("parentCatId").val(),postChildSnap.child("resId").val())
        getBookmark(postChildSnap.child("postKey").val())
        getBookmarkCount(postChildSnap.child("postKey").val())
        getPostLikeCount()
        getPostLikes(postChildSnap.child("postKey").val())
        getResData()
        getReviewCount()
      })

    })
  }*/

  useEffect(() =>
  {
    //getBookmarkPostData()
  },[])

  return(
    <TouchableOpacity
      activeOpacity={0.6}
      style={{flex:1, justifyContent:'center', }}>
      <View style={{height:height}}>
        <Video
          ref={player}
          resizeMode={'cover'}
          source={{uri : postVideo}}
          onBuffer={onBuffer}
          poster={postThumbNail}
          posterResizeMode={'cover'}
          playInBackground={false}
          onEnd={() => {
            console.log("on end")
            dispatch(setIsVideoLoad(false))}}
          onVideoEnd={() => dispatch(setIsVideoLoad(false))}
          onLoad={() => dispatch(setIsVideoLoad(true))}
          onVideoLoad={() => dispatch(setIsVideoLoad(true))}
          onLoadStart={() =>dispatch(setIsVideoLoad(true))}
          onVideoLoadStart={() =>dispatch(setIsVideoLoad(true))}
          onVideoBuffer={() => {
            dispatch(setIsVideoLoad(true))}}
          playWhenInactive={false}
          paused={!props.isActive}
          progressUpdateInterval={23000}
          maxBitRate={25000}
          style={{ backgroundColor:colors.colors.black,height:'100%',width:'100%',borderRadius:BORDER_RADIUS.lg}}/>
        {!props.isActive &&
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, }}>
            <View style={{
              height: 45,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: themedColors.bgColor,
              borderRadius: BORDER_RADIUS._8xl,
            }}>
              <ActivityIndicator
                animating={true}
                color="red" />
            </View>
          </View>}
        <View style={{flex:1,flexDirection:'row',position:'absolute',left:0,right:0,bottom:0,}}>
          <View style={{flex:1,justifyContent:'flex-end',marginStart:SPACE._2lg,marginEnd:SPACE._2md,marginBottom:SPACE._2lg,}}>
            <View style={{marginBottom:SPACE._2xl,justifyContent:'flex-end',borderRadius:BORDER_RADIUS.lg,backgroundColor:colors.colors.transparent,padding:SPACE._2md}}>
              <View style={{flex:1,flexDirection:'row'}}>
                <View style={{height:40,width:40,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,justifyContent:'center',alignItems:'center'}}>
                  {foodImg != '' ?
                    <Image
                      style={{ height: 35, width: 35, borderRadius: BORDER_RADIUS._8xl }}
                      source={{ uri: foodImg }} /> : null}
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{flex:1,marginStart:SPACE._2md}}>
                    <AppText
                      numberOfLine={1}
                      style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.lg,}}
                      text={foodName}/>
                  </TouchableOpacity>
                  <View style={{marginStart:SPACE._2md,justifyContent:'center'}}>
                    <AppText
                      numberOfLine={1}
                      style={{color:colors.colors.white,fontFamily:GILROY.medium,fontSize:FONT_SIZE._2xs,}}
                      text={"from " + resName}/>
                  </View>
                </View>
              </View>
              <View style={{flexDirection:'row',marginTop:SPACE._2md}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:25,paddingStart:SPACE._2md,paddingEnd:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor}}>
                  <View>
                    <MaterialCommunityIcons
                      name={"food"}
                      size={14}/>
                  </View>
                  <View style={{marginStart:SPACE._2xs}}>
                    <AppText
                      style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                      text={foodCatName}/>
                  </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:25,marginStart:SPACE.sm,paddingStart:SPACE._2md,paddingEnd:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor}}>
                  <View>
                    <AntDesign
                      color={colors.colors.star}
                      size={14}
                      name={"star"}/>
                  </View>
                  <View style={{marginStart:SPACE._2xs}}>
                    <AppText
                      style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                      text={foodRating != 0 ? foodRating.toFixed(1) : ''}/>
                  </View>
                </View>
              </View>
              <View style={{flexDirection:'row',width:100,justifyContent:'center',alignItems:'center',height:25,marginTop:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor,}}>
                <View>
                  <FontAwesome
                    color={themedColors.primaryIconColor}
                    size={14}
                    name={"money"} />
                </View>
                <View style={{marginStart:SPACE._2xs}}>
                  <AppText
                    style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                    text={foodPrice != '' ? "RS : " + foodPrice : ''}/>
                </View>
              </View>
              <View style={{marginTop:SPACE._2md}}>
                <AppText
                  numberOfLine={3}
                  style={{letterSpacing:1,color:colors.colors.white,fontFamily:MONTSERRAT.medium,fontSize:FONT_SIZE._3xs,lineHeight:16}}
                  text={postDes != '' ? postDes : ''}/>
              </View>
            </View>
          </View>
          <View style={{marginBottom:"30%",marginEnd:SPACE._2md,marginTop:SPACE._2xl}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResDetail',{res_id:resId,res_name:resName})}
              activeOpacity={0.6}>
              <View style={{height:50,width:50,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,justifyContent:'center',alignItems:'center'}}>
                {resImg != '' ?
                  <Image
                    style={{ height: 40, width: 40, borderRadius: BORDER_RADIUS._8xl }}
                    source={{ uri: resImg }} /> : null}
              </View>
            </TouchableOpacity>
            <View style={{marginTop:SPACE.xl,alignItems:'center'}}>
              <TouchableOpacity
                onPress={() => checkPostLikes(postKey,resId)}
                activeOpacity={0.6}
                style={{backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:50,width:50,justifyContent:'center',alignItems:'center'}}>
                {isPostLike ?
                  <MaterialCommunityIcons
                    size={24}
                    color={colors.colors.red}
                    name={"cards-heart"}/> :
                  <MaterialCommunityIcons
                    size={26}
                    name={"cards-heart-outline"}/>}
              </TouchableOpacity>
              <View style={{marginTop:SPACE._2md,alignItems:'center'}}>
                <AppText
                  style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
                  text={postLikeCount.toString()}/>
              </View>
            </View>
            <View>
              <TouchableOpacity
                /*onPress={() => navigation.navigate('Comments',{postData : props.item})}*/
                activeOpacity={0.6}>
                <View style={{marginTop:SPACE.md,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:50,width:50,justifyContent:'center',alignItems:'center'}}>
                  <MaterialCommunityIcons
                    color={themedColors.primaryIconColor}
                    size={24}
                    name={"clipboard-text-multiple-outline"}/>
                </View>
                <View style={{marginTop:SPACE._2md,justifyContent:'center',alignItems:'center'}}>
                  <AppText
                    style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
                    text={reviewCount.toString()}/>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => checkBookmark(postKey)}
                activeOpacity={0.6}
                style={{marginTop:SPACE.md,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:50,width:50,justifyContent:'center',alignItems:'center'}}>
                {isBookmark ?
                  <MaterialCommunityIcons
                    color={themedColors.commonBtnColor}
                    size={24}
                    name={"bookmark"} /> :
                  <MaterialCommunityIcons
                    color={themedColors.primaryIconColor}
                    size={24}
                    name={"bookmark-outline"} />}
              </TouchableOpacity>
            </View>
            <View style={{marginTop:SPACE._2md,justifyContent:'center',alignItems:'center'}}>
              <AppText
                style={{color:colors.colors.white,fontFamily:GILROY.bold,fontSize:FONT_SIZE.xs}}
                text={bookmarkCount.toString()}/>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  resDetailPostMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
  },
  resDetailPostItemImgCont : {
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    alignItems:'center',
    flexDirection:'row'
  },
  resDetailImg : {
    width:30,
    height:30,
    borderRadius:BORDER_RADIUS._8xl
  },
  resDetailPostNameCont : {
    marginStart:SPACE._2md
  },
  resDetailPostNameTxt : {
    includeFontPadding:false,
    textAlignVertical:'center',
    lineHeight:18,
    fontWeight:'600',
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  resDetailLocTxt : {
    includeFontPadding:false,
    textAlignVertical:'center',
    lineHeight:16,
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  resDetailPostImg : {
    height:280,
    width:'100%',
    resizeMode:'cover'
  },
  resDetailPostIconMainCont : {
    margin:SPACE._2lg
  },
  resDetailPostIconSubCont : {
    flexDirection:'row'
  },
  resDetailPostIconCont1 : {
    flex:1,
    flexDirection:'row',
  },
  resDetailPostChatIconCont : {
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md
  },
  resDetailPostDesMainCont : {
    flex:1,
    marginTop:SPACE._2lg
  },
  resDetailPostLikeTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.xs,
    letterSpacing:0,
  },
  resDetailPostDesCont : {
    marginTop:SPACE._2md
  },
  resDetailPostDesTxt : {
    includeFontPadding:false,
    textAlignVertical:'center',
    lineHeight:16,
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.xs,
  }

})
