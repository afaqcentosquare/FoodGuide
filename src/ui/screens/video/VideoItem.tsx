import React, { useEffect, useRef, useState } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Video, { OnBufferData } from "react-native-video";
import Helper from "../../../helper/Helper";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { BORDER_RADIUS,FONT_SIZE,SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { postObj } from "../../../models/res_model/PostModel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../../redux";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { setIsVideoLoad } from "../../../redux/slice/VideoSlice";

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 235 : 170

type Props = {
  index : number,
  length : number,
  item : postObj,
  isActive : any
}

type postNavProp = StackNavigationProp<AllScreenStackParamList>;

export const VideoItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<postNavProp>();
  const { postVideo,postDes,postThumbNail,postKey,postUserId,foodId,resId,parentCatId } = props.item
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

  useEffect(() =>
  {
    getFoodData(foodId,parentCatId,resId)
    getBookmark(postKey)
    getBookmarkCount(postKey)
    getPostLikeCount()
    getPostLikes(postKey)
    getResData()
    getReviewCount()
  },[])

  return(
    <View
      style={[styles.videoItemMainCont,{height:height - BOTTOM_HEIGHT ,
              marginTop: props.index === 0 ? SPACE.sm : SPACE.sm,
              marginBottom: props.index === props.length - 1 ?  SPACE.sm : SPACE.sm}]}>
      <Video
        ref={player}
        resizeMode={'cover'}
        source={{uri : postVideo}}
        onBuffer={onBuffer}
        poster={postThumbNail}
        posterResizeMode={'cover'}
        playInBackground={false}
        onEnd={() => {dispatch(setIsVideoLoad(false))}}
        onVideoEnd={() => dispatch(setIsVideoLoad(false))}
        onLoad={() => dispatch(setIsVideoLoad(true))}
        onVideoLoad={() => dispatch(setIsVideoLoad(true))}
        onLoadStart={() =>dispatch(setIsVideoLoad(true))}
        onVideoLoadStart={() =>dispatch(setIsVideoLoad(true))}
        onVideoBuffer={() => {dispatch(setIsVideoLoad(true))}}
        paused={!props.isActive}
        progressUpdateInterval={23000}
        maxBitRate={25000}
        style={[styles.videoItem,{backgroundColor:themedColors.black}]}/>
      {!props.isActive &&
        <View style={styles.videoLoadCont}>
          <View style={[styles.videoLoad,{backgroundColor: themedColors.bgColor}]}>
            <ActivityIndicator
              animating={true}
              color="red" />
          </View>
        </View>}
      <View style={styles.videoItemDetailMainCont}>

        <View style={styles.videoItemNameMainCont}>
          <View style={[styles.videoItemNameSubCont,{backgroundColor:themedColors.transparent}]}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={[styles.videoItemFoodImgCont,{backgroundColor:themedColors.cardBgColor}]}>
                {foodImg != '' ?
                  <Image
                    style={styles.videoItemFoodImg}
                    source={{ uri: foodImg }} /> : null}
              </View>
              <View style={styles.videoItemNameTxtCont}>
                <TouchableOpacity
                  /* onPress={() => navigation.navigate('FoodDetail',{food_info :
                       {foodId : foodId, foodRating : foodRating,foodPrice : foodPrice,
                        foodImg : foodImg,foodCatName : foodCatName,foodName : foodName,
                        foodDes : foodDes,isFoodAdded : false,parentCatId:parentCatId,resId:resId}})}*/
                  activeOpacity={0.6}
                  style={styles.videoItemFoodNameTxtCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.videoItemFoodNameTxt,{color:themedColors.white}]}
                    text={foodName}/>
                </TouchableOpacity>
                <View style={styles.videoItemResNameCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.videoItemResNameTxt,{color:themedColors.secondaryTxtColor}]}
                    text={"from " + resName}/>
                </View>
              </View>
            </View>
            <View style={styles.videoItemCardBgCont}>
              <View style={[styles.videoItemCardBgSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <MaterialCommunityIcons
                    color={themedColors.primaryIconColor}
                    name={"food"}
                    size={14}/>
                </View>
                <View style={styles.videoItemFoodCatNameTxtCont}>
                  <AppText
                    style={[styles.videoItemFoodCatNameTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodCatName}/>
                </View>
              </View>
              <View style={[styles.videoItemStarBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <AntDesign
                    color={themedColors.yellow}
                    size={14}
                    name={"star"}/>
                </View>
                <View style={styles.videoItemStarTxtCont}>
                  <AppText
                    style={[styles.videoItemStarTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodRating != 0 ? foodRating.toFixed(1) : '0.0'}/>
                </View>
              </View>
            </View>
            <View style={[styles.videoItemPriceBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View>
                <FontAwesome
                  color={themedColors.primaryIconColor}
                  size={14}
                  name={"money"} />
              </View>
              <View style={styles.videoItemFoodPriceTxtCont}>
                <AppText
                  style={[styles.videoItemFoodPriceTxt,{color:themedColors.primaryTxtColor}]}
                  text={foodPrice != '' ? "RS : " + foodPrice : 'RS:0.00'}/>
              </View>
            </View>
            <View style={styles.videoItemDesTxtCont}>
              <AppText
                numberOfLine={3}
                style={[styles.videoItemDesTxt,{color:themedColors.white}]}
                text={postDes != '' ? postDes : ''}/>
            </View>
          </View>
        </View>
        <View style={styles.videoItemIconCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResDetail',{res_id:resId,res_name:resName})}
            activeOpacity={0.6}>
            <View style={[styles.videoItemUserImgCont,{backgroundColor:themedColors.cardBgColor}]}>
              {resImg != '' ?
                <Image
                  style={styles.videoItemUserImg}
                  source={{ uri: resImg }} /> : null}
            </View>
          </TouchableOpacity>
          <View style={styles.videoItemIconMainCont}>
            <TouchableOpacity
              onPress={() => checkPostLikes(postKey,resId)}
              activeOpacity={0.6}
              style={[styles.videoItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              {isPostLike ?
                <MaterialCommunityIcons
                  size={18}
                  color={themedColors.red}
                  name={"cards-heart"}/> :
                <MaterialCommunityIcons
                  size={18}
                  color={themedColors.primaryIconColor}
                  name={"cards-heart-outline"}/>}
            </TouchableOpacity>
            <View style={styles.videoItemIconTxtCont}>
              <AppText
                style={[styles.videoItemIconTxt,{color:themedColors.white}]}
                text={postLikeCount.toString() != "" ? postLikeCount.toString() : "0"}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.videoItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}
              onPress={() => navigation.navigate('Comments',{postData : props.item})}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                color={themedColors.primaryIconColor}
                size={18}
                name={"clipboard-text-multiple-outline"}/>
            </TouchableOpacity>
            <View style={styles.videoItemIconTxtCont}>
              <AppText
                style={[styles.videoItemIconTxt,{color:themedColors.white}]}
                text={reviewCount.toString() != '' ? reviewCount.toString() : "0"}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => checkBookmark(postKey)}
              activeOpacity={0.6}
              style={[styles.videoItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              {isBookmark ?
                <MaterialCommunityIcons
                  color={themedColors.blue}
                  size={18}
                  name={"bookmark"} /> :
                <MaterialCommunityIcons
                  color={themedColors.primaryIconColor}
                  size={18}
                  name={"bookmark-outline"} />}
            </TouchableOpacity>
          </View>
          <View style={styles.videoItemIconTxtCont}>
            <AppText
              style={[styles.videoItemIconTxt,{color:themedColors.white}]}
              text={bookmarkCount.toString() != '' ? bookmarkCount.toString() : "0"}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  videoItemMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  videoItem : {
    height:'100%',
    width:'100%',
    borderRadius:BORDER_RADIUS.lg
  },
  videoLoadCont : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoLoad : {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
  },
  videoItemDetailMainCont : {
    flex:1,
    flexDirection:'row',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
  },
  videoItemNameMainCont : {
    flex:1,
    justifyContent:'flex-end',
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2md,
    marginBottom:SPACE._2lg,
  },
  videoItemNameSubCont : {
    justifyContent:'flex-end',
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2md
  },
  videoItemFoodImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  videoItemFoodImg : {
    height: 35,
    width: 35,
    borderRadius: BORDER_RADIUS._8xl
  },
  videoItemNameTxtCont : {
    flex:1,justifyContent:'center'
  },
  videoItemFoodNameTxtCont : {
    flex:1,marginStart:SPACE._2md
  },
  videoItemFoodNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  videoItemResNameCont : {
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  videoItemResNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  videoItemCardBgCont : {
    flexDirection:'row',
    marginTop:SPACE._2md
  },
  videoItemCardBgSubCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  videoItemFoodCatNameTxtCont : {
    marginStart:SPACE._2xs
  },
  videoItemFoodCatNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  videoItemStarBgCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginStart:SPACE.sm,
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  videoItemStarTxtCont : {
    marginStart:SPACE._2xs
  },
  videoItemStarTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  videoItemPriceBgCont : {
    height:25,
    width:100,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  videoItemFoodPriceTxtCont : {
    marginStart:SPACE._2xs
  },
  videoItemFoodPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  videoItemDesTxtCont : {
    marginTop:SPACE._2md
  },
  videoItemDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  videoItemIconCont : {
    marginBottom:SPACE._4xl,
    marginEnd:SPACE._2md,
    marginTop:SPACE._2xl
  },
  videoItemUserImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  videoItemUserImg : {
    height:35,
    width:35,
    borderRadius: BORDER_RADIUS._8xl
  },
  videoItemIconMainCont : {
    marginTop:SPACE.md,
    alignItems:'center'
  },
  videoItemIconSubCont : {
    height:40,
    width:40,
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  videoItemIconTxtCont : {
    marginTop:SPACE.xs,
    alignItems:'center'
  },
  videoItemIconTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  }
})
