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
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { postObj } from "../../../models/res_model/PostModel";
import { useAppDispatch } from "../../../redux";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { setIsVideoLoad } from "../../../redux/slice/VideoSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 0 : 0

type Props = {
  index : number,
  length : number,
  item : postObj,
  isActive : any
}

type postNavProp = StackNavigationProp<AllScreenStackParamList>;

export const VideoDetailItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
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
      const userId : any = auth().currentUser?.uid;
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
      style={[styles.vdItemMainCont,{height:height - BOTTOM_HEIGHT}]}>
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
        style={[styles.vdItem,{backgroundColor:themedColors.black}]}/>
      {!props.isActive &&
        <View style={styles.vdLoadCont}>
          <View style={[styles.vdLoad,{backgroundColor: themedColors.bgColor}]}>
            <ActivityIndicator
              animating={true}
              color="red" />
          </View>
        </View>}
      <View style={styles.vdItemDetailMainCont}>
        <View style={styles.vdItemNameMainCont}>
          <View style={[styles.vdItemNameSubCont,{backgroundColor:themedColors.transparent}]}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={[styles.vdItemFoodImgCont,{backgroundColor:themedColors.cardBgColor}]}>
                {foodImg != '' ?
                  <Image
                    style={styles.vdItemFoodImg}
                    source={{ uri: foodImg }} /> : null}
              </View>
              <View style={styles.vdItemNameTxtCont}>
                <TouchableOpacity
                  /* onPress={() => navigation.navigate('FoodDetail',{food_info :
                       {foodId : foodId, foodRating : foodRating,foodPrice : foodPrice,
                        foodImg : foodImg,foodCatName : foodCatName,foodName : foodName,
                        foodDes : foodDes,isFoodAdded : false,parentCatId:parentCatId,resId:resId}})}*/
                  activeOpacity={0.6}
                  style={styles.vdItemFoodNameTxtCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.vdItemFoodNameTxt,{color:themedColors.white}]}
                    text={foodName}/>
                </TouchableOpacity>
                <View style={styles.vdItemResNameCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.vdItemResNameTxt,{color:themedColors.secondaryTxtColor}]}
                    text={"from " + resName}/>
                </View>
              </View>
            </View>
            <View style={styles.vdItemCardBgCont}>
              <View style={[styles.vdItemCardBgSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <MaterialCommunityIcons
                    color={themedColors.primaryIconColor}
                    name={"food"}
                    size={14}/>
                </View>
                <View style={styles.vdItemFoodCatNameTxtCont}>
                  <AppText
                    style={[styles.vdItemFoodCatNameTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodCatName}/>
                </View>
              </View>
              <View style={[styles.vdItemStarBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <AntDesign
                    color={themedColors.yellow}
                    size={14}
                    name={"star"}/>
                </View>
                <View style={styles.vdItemStarTxtCont}>
                  <AppText
                    style={[styles.vdItemStarTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodRating != 0 ? foodRating.toFixed(1) : '0.0'}/>
                </View>
              </View>
            </View>
            <View style={[styles.vdItemPriceBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View>
                <FontAwesome
                  color={themedColors.primaryIconColor}
                  size={14}
                  name={"money"} />
              </View>
              <View style={styles.vdItemFoodPriceTxtCont}>
                <AppText
                  style={[styles.vdItemFoodPriceTxt,{color:themedColors.primaryTxtColor}]}
                  text={foodPrice != '' ? "RS : " + foodPrice : 'RS:0.00'}/>
              </View>
            </View>
            <View style={styles.vdItemDesTxtCont}>
              <AppText
                numberOfLine={3}
                style={[styles.vdItemDesTxt,{color:themedColors.white}]}
                text={postDes != '' ? postDes : ''}/>
            </View>
          </View>
        </View>
        <View style={styles.vdItemIconCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResDetail',{res_id:resId,res_name:resName})}
            activeOpacity={0.6}>
            <View style={[styles.vdItemUserImgCont,{backgroundColor:themedColors.cardBgColor}]}>
              {resImg != '' ?
                <Image
                  style={styles.vdItemUserImg}
                  source={{ uri: resImg }} /> : null}
            </View>
          </TouchableOpacity>
          <View style={styles.vdItemIconMainCont}>
            <TouchableOpacity
              onPress={() => checkPostLikes(postKey,resId)}
              activeOpacity={0.6}
              style={[styles.vdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
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
            <View style={styles.vdItemIconTxtCont}>
              <AppText
                style={[styles.vdItemIconTxt,{color:themedColors.white}]}
                text={postLikeCount.toString()}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.vdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}
              onPress={() => navigation.navigate('Comments',{postData : props.item})}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                color={themedColors.primaryIconColor}
                size={18}
                name={"clipboard-text-multiple-outline"}/>
            </TouchableOpacity>
            <View style={styles.vdItemIconTxtCont}>
              <AppText
                style={[styles.vdItemIconTxt,{color:themedColors.white}]}
                text={reviewCount.toString()}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => checkBookmark(postKey)}
              activeOpacity={0.6}
              style={[styles.vdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
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
          <View style={styles.vdItemIconTxtCont}>
            <AppText
              style={[styles.vdItemIconTxt,{color:themedColors.white}]}
              text={bookmarkCount.toString()}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  vdItemMainCont : {
    flex:1,
  },
  vdItem : {
    height:'100%',
    width:'100%',
    borderRadius:BORDER_RADIUS.lg
  },
  vdLoadCont : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  vdLoad : {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
  },
  vdItemDetailMainCont : {
    flex:1,
    flexDirection:'row',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
  },
  vdItemNameMainCont : {
    flex:1,
    justifyContent:'flex-end',
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2md,
    marginBottom:Platform.OS === "ios" ? SPACE._2xl : SPACE.xl,
  },
  vdItemNameSubCont : {
    justifyContent:'flex-end',
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2md
  },
  vdItemFoodImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  vdItemFoodImg : {
    height: 35,
    width: 35,
    borderRadius: BORDER_RADIUS._8xl
  },
  vdItemNameTxtCont : {
    flex:1,
    justifyContent:'center'
  },
  vdItemFoodNameTxtCont : {
    flex:1,
    marginStart:SPACE._2md
  },
  vdItemFoodNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  vdItemResNameCont : {
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  vdItemResNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  vdItemCardBgCont : {
    flexDirection:'row',
    marginTop:SPACE._2md
  },
  vdItemCardBgSubCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  vdItemFoodCatNameTxtCont : {
    marginStart:SPACE._2xs
  },
  vdItemFoodCatNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  vdItemStarBgCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginStart:SPACE.sm,
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  vdItemStarTxtCont : {
    marginStart:SPACE._2xs
  },
  vdItemStarTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  vdItemPriceBgCont : {
    height:25,
    width:100,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  vdItemFoodPriceTxtCont : {
    marginStart:SPACE._2xs
  },
  vdItemFoodPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  vdItemDesTxtCont : {
    marginTop:SPACE._2md
  },
  vdItemDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  vdItemIconCont : {
    marginBottom:"18%",
    marginEnd:SPACE._2md,
    marginTop:SPACE._2xl
  },
  vdItemUserImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  vdItemUserImg : {
    height:35,
    width:35,
    borderRadius: BORDER_RADIUS._8xl
  },
  vdItemIconMainCont : {
    marginTop:SPACE.md,
    alignItems:'center'
  },
  vdItemIconSubCont : {
    height:40,
    width:40,
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  vdItemIconTxtCont : {
    marginTop:SPACE.xs,
    alignItems:'center'
  },
  vdItemIconTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  }
})
