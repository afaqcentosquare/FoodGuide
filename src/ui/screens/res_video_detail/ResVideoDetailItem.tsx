import React, { useEffect, useRef, useState } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { ActivityIndicator,Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Video, { OnBufferData } from "react-native-video";
import Helper from "../../../helper/Helper";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts} from "../../../config";
import { postObj } from "../../../models/res_model/PostModel";
import { useAppDispatch } from "../../../redux";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { setIsVideoLoad } from "../../../redux/slice/VideoSlice";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 0 : 165

type Props = {
  index : number,
  length : number,
  item : postObj,
  isActive : any
}

type postNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ResVideoDetailItem = React.memo<Props>((props) =>
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
      style={[styles.rvdItemMainCont,{height:height - BOTTOM_HEIGHT}]}>
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
        style={[styles.rvdItem,{backgroundColor:themedColors.black}]}/>
      {!props.isActive &&
        <View style={styles.rvdLoadCont}>
          <View style={[styles.rvdLoad,{backgroundColor: themedColors.bgColor}]}>
            <ActivityIndicator
              animating={true}
              color="red" />
          </View>
        </View>}
      <View style={styles.rvdItemDetailMainCont}>
        <View style={styles.rvdItemNameMainCont}>
          <View style={[styles.rvdItemNameSubCont,{backgroundColor:themedColors.transparent}]}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={[styles.rvdItemFoodImgCont,{backgroundColor:themedColors.cardBgColor}]}>
                {foodImg != '' ?
                  <Image
                    style={styles.rvdItemFoodImg}
                    source={{ uri: foodImg }} /> : null}
              </View>
              <View style={styles.rvdItemNameTxtCont}>
                <TouchableOpacity
                  /* onPress={() => navigation.navigate('FoodDetail',{food_info :
                       {foodId : foodId, foodRating : foodRating,foodPrice : foodPrice,
                        foodImg : foodImg,foodCatName : foodCatName,foodName : foodName,
                        foodDes : foodDes,isFoodAdded : false,parentCatId:parentCatId,resId:resId}})}*/
                  activeOpacity={0.6}
                  style={styles.rvdItemFoodNameTxtCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.rvdItemFoodNameTxt,{color:themedColors.white}]}
                    text={foodName}/>
                </TouchableOpacity>
                <View style={styles.rvdItemResNameCont}>
                  <AppText
                    numberOfLine={1}
                    style={[styles.rvdItemResNameTxt,{color:themedColors.secondaryTxtColor}]}
                    text={"from " + resName}/>
                </View>
              </View>
            </View>
            <View style={styles.rvdItemCardBgCont}>
              <View style={[styles.rvdItemCardBgSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <MaterialCommunityIcons
                    color={themedColors.primaryIconColor}
                    name={"food"}
                    size={14}/>
                </View>
                <View style={styles.rvdItemFoodCatNameTxtCont}>
                  <AppText
                    style={[styles.rvdItemFoodCatNameTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodCatName}/>
                </View>
              </View>
              <View style={[styles.rvdItemStarBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <AntDesign
                    color={themedColors.yellow}
                    size={14}
                    name={"star"}/>
                </View>
                <View style={styles.rvdItemStarTxtCont}>
                  <AppText
                    style={[styles.rvdItemStarTxt,{color:themedColors.primaryTxtColor}]}
                    text={foodRating != 0 ? foodRating.toFixed(1) : '0.0'}/>
                </View>
              </View>
            </View>
            <View style={[styles.rvdItemPriceBgCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View>
                <FontAwesome
                  color={themedColors.primaryIconColor}
                  size={14}
                  name={"money"} />
              </View>
              <View style={styles.rvdItemFoodPriceTxtCont}>
                <AppText
                  style={[styles.rvdItemFoodPriceTxt,{color:themedColors.primaryTxtColor}]}
                  text={foodPrice != '' ? "RS : " + foodPrice : 'RS:0.00'}/>
              </View>
            </View>
            <View style={styles.rvdItemDesTxtCont}>
              <AppText
                numberOfLine={3}
                style={[styles.rvdItemDesTxt,{color:themedColors.primaryTxtColor}]}
                text={postDes != '' ? postDes : ''}/>
            </View>
          </View>
        </View>
        <View style={styles.rvdItemIconCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResDetail',{res_id:resId,res_name:resName})}
            activeOpacity={0.6}>
            <View style={[styles.rvdItemUserImgCont,{backgroundColor:themedColors.cardBgColor}]}>
              {resImg != '' ?
                <Image
                  style={styles.rvdItemUserImg}
                  source={{ uri: resImg }} /> : null}
            </View>
          </TouchableOpacity>
          <View style={styles.rvdItemIconMainCont}>
            <TouchableOpacity
              onPress={() => checkPostLikes(postKey,resId)}
              activeOpacity={0.6}
              style={[styles.rvdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
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
            <View style={styles.rvdItemIconTxtCont}>
              <AppText
                style={[styles.rvdItemIconTxt,{color:themedColors.white}]}
                text={postLikeCount.toString()}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.rvdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}
              onPress={() => navigation.navigate('Comments',{postData : props.item})}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                color={themedColors.primaryIconColor}
                size={18}
                name={"clipboard-text-multiple-outline"}/>
            </TouchableOpacity>
            <View style={styles.rvdItemIconTxtCont}>
              <AppText
                style={[styles.rvdItemIconTxt,{color:themedColors.white}]}
                text={reviewCount.toString()}/>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => checkBookmark(postKey)}
              activeOpacity={0.6}
              style={[styles.rvdItemIconSubCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
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
          <View style={styles.rvdItemIconTxtCont}>
            <AppText
              style={[styles.rvdItemIconTxt,{color:themedColors.white}]}
              text={bookmarkCount.toString()}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  rvdItemMainCont : {
    flex:1,
  },
  rvdItem : {
    height:'100%',
    width:'100%',
    borderRadius:BORDER_RADIUS.lg
  },
  rvdLoadCont : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rvdLoad : {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
  },
  rvdItemDetailMainCont : {
    flex:1,
    flexDirection:'row',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
  },
  rvdItemNameMainCont : {
    flex:1,
    justifyContent:'flex-end',
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2md,
    marginBottom:Platform.OS === "ios" ? SPACE._2xl : SPACE._2lg,
  },
  rvdItemNameSubCont : {
    justifyContent:'flex-end',
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2md
  },
  rvdItemFoodImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  rvdItemFoodImg : {
    height: 35,
    width: 35,
    borderRadius: BORDER_RADIUS._8xl
  },
  rvdItemNameTxtCont : {
    flex:1,justifyContent:'center'
  },
  rvdItemFoodNameTxtCont : {
    flex:1,marginStart:SPACE._2md
  },
  rvdItemFoodNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  rvdItemResNameCont : {
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  rvdItemResNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  rvdItemCardBgCont : {
    flexDirection:'row',
    marginTop:SPACE._2md
  },
  rvdItemCardBgSubCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  rvdItemFoodCatNameTxtCont : {
    marginStart:SPACE._2xs
  },
  rvdItemFoodCatNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  rvdItemStarBgCont : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginStart:SPACE.sm,
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  rvdItemStarTxtCont : {
    marginStart:SPACE._2xs
  },
  rvdItemStarTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  rvdItemPriceBgCont : {
    height:25,
    width:100,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  rvdItemFoodPriceTxtCont : {
    marginStart:SPACE._2xs
  },
  rvdItemFoodPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  rvdItemDesTxtCont : {
    marginTop:SPACE._2md
  },
  rvdItemDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  rvdItemIconCont : {
    marginBottom:"15%",
    marginEnd:SPACE._2md,
    marginTop:SPACE._2xl
  },
  rvdItemUserImgCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  rvdItemUserImg : {
    height:35,
    width:35,
    borderRadius: BORDER_RADIUS._8xl
  },
  rvdItemIconMainCont : {
    marginTop:SPACE.md,
    alignItems:'center'
  },
  rvdItemIconSubCont : {
    height:40,
    width:40,
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  rvdItemIconTxtCont : {
    marginTop:SPACE.xs,
    alignItems:'center'
  },
  rvdItemIconTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  }
})
