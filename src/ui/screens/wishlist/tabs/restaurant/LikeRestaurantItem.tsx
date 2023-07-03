import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { likeResObj } from "../../../../../models/res_model/WishlistModel";
import { AllScreenStackParamList } from "../../../../../routes/all_routes/AllScreenStack";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import colors from "../../../../../config/colors";
import { AppText } from "../../../../components/AppText";
import Helper from "../../../../../helper/Helper";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { GILROY, MONTSERRAT } from "../../../../../config";
import database from "@react-native-firebase/database";

type Props = {
  item : likeResObj
}

type searchNavProp = StackNavigationProp<AllScreenStackParamList>;

export const LikeRestaurantItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<searchNavProp>();
  const {themedColors} = usePreferredTheme();
  const { isLike,resId } = props.item;
  const [checkResLike,setCheckResLike] = useState(false);
  const [likeResImg,setLikeResImg] = useState('');
  const [likeResName,setLikeResName] = useState('');
  const [likeResLoc,setLikeResLoc] = useState('');
  const [likeResRating,setLikeResRating] = useState(0)

  function checkResLikes(resId : string)
  {
    Helper.checkResLikes(resId)
      .then((result : any) =>
      {
        if (result == null)
        {
          resLikes(resId)
        }
        else
        {
          removeResLike(resId)
        }
      })
  }

  function getResLikes(resId : string)
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Restaurants")
          .child(resId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setCheckResLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("SEARCH_RES_ERROR : " + e);
    }
  }

  function resLikes(resId : string)
  {
    Helper.resLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getResLikes(resId)
        }
      })
  }

  function removeResLike(resId : string)
  {
    Helper.removeResLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getResLikes(resId)
        }
      })
  }

  function getLikeResData(resId : string)
  {
    Helper.getRestaurantData(resId)
      .then((result : any) =>
      {
        setLikeResImg(result.resImg)
        setLikeResName(result.name)
        setLikeResLoc(result.location)
        setLikeResRating(result.rating)
      })
  }

  useEffect(() =>
  {
    getResLikes(resId)
    getLikeResData(resId)
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('ResDetail',{res_id : resId,res_name:likeResName})}
      activeOpacity={0.6}
      style={styles.searchItemMainCont}>
      <View style={styles.searchItemSubCont}>
        <View style={styles.searchItemImgCont}>
          {likeResImg !== '' ?
            <Image
              style={styles.searchItemImg}
              source={{ uri: likeResImg }} /> : null}
        </View>
        <TouchableOpacity
          onPress={() => checkResLikes(resId)}
          activeOpacity={0.6}
          style={[styles.searchHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkResLike ?
            <MaterialCommunityIcons
              size={15}
              color={colors.colors.red}
              name={"cards-heart"}/> :
            <MaterialCommunityIcons
              size={15}
              name={"cards-heart-outline"}/>}
        </TouchableOpacity>
        <View style={styles.searchItemNameCont}>
          <View>
            <AppText
              style={styles.searchItemNameTxt}
              numberOfLine={1}
              text={likeResName}/>
          </View>
          <View style={styles.searchItemTxtCont}>
            <View>
              <Ionicons
                color={colors.colors.white}
                size={14}
                name={"location"}/>
            </View>
            <View style={styles.searchItemLocTxtCont}>
              <AppText
                style={styles.searchItemDesTxt}
                numberOfLine={1}
                text={likeResLoc}/>
            </View>
          </View>
          <View style={styles.searchItemStarCont}>
            <View>
              <AntDesign
                color={colors.colors.star}
                size={14}
                name={"star"}/>
            </View>
            <View style={styles.searchItemRateTxtCont}>
              <AppText
                style={styles.searchItemRateTxt}
                text={likeResRating != 0 ? likeResRating.toFixed(1) : "0.0"}/>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  searchItemMainCont : {
    flex:1,
    maxWidth:'50%',
  },
  searchItemSubCont : {
    flex:1,
    margin:SPACE._2xs,
    borderRadius:BORDER_RADIUS.lg,
  },
  searchItemImgCont : {
    flex:1
  },
  searchItemImg : {
    width:'100%',
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
    height:280
  },
  searchHeartIconCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:25,
    width:25,
    position:'absolute',
    top:0,
    right:0,
  },
  searchItemNameCont : {
    position:'absolute',
    bottom:SPACE.sm,
    left:SPACE.sm,
    right:SPACE.sm,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.transparent,
    marginTop:SPACE._2lg,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
  },
  searchItemNameTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.base,
    color:colors.colors.white
  },
  searchItemDesTxt : {
    fontFamily:MONTSERRAT.medium,
    fontSize:FONT_SIZE._3xs,
    color:colors.colors.white,
  },
  searchItemStarCont : {
    alignItems:'center',
    flexDirection:'row',
    marginTop:SPACE._2xs
  },
  searchItemRateTxtCont : {
    flex:1,
    marginStart:SPACE._2xs,
  },
  searchItemRateTxt : {
    fontFamily:GILROY.medium,
    fontSize:FONT_SIZE._3xs,
    color:colors.colors.white
  },
  searchItemTxtCont : {
    flex:1,
    alignItems:'center',
    marginTop:SPACE._2xs,
    flexDirection:'row'
  },
  searchItemLocTxtCont : {
    flex:1,
    marginStart:SPACE._2xs,
  }
})
