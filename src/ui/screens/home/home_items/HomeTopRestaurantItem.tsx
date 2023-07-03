import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE,SPACE } from "../../../../config/Dimens";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
// @ts-ignore
import StarRating from 'react-native-star-rating';
import { Fonts } from "../../../../config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../routes/all_routes/AllScreenStack";
import database from "@react-native-firebase/database";
import { topResDataObj } from "../../../../models/res_model/HomeModel";
import Helper from "../../../../helper/Helper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  index : number,
  length : number,
  item : topResDataObj
}

type searchNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeTopRestaurantItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<searchNavProp>();
  const {themedColors} = usePreferredTheme();
  const { resId } = props.item;
  const [topResImg,setTopResImg] = useState('');
  const [topResName,setTopResName] = useState('');
  const [topResLoc,setTopResLoc] = useState('');
  const [topResRating,setTopResRating] = useState(0)
  const [checkResLike,setCheckResLike] = useState(false);

  function checkTopResLikes(resId : string)
  {
    Helper.checkResLikes(resId)
      .then((result : any) =>
      {
        if (result == null)
        {
          topResLike(resId)
        }
        else
        {
          removeTopResLike(resId)
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
      console.log("TOP_RES_ERROR : " + e);
    }
  }

  function topResLike(resId : string)
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

  function removeTopResLike(resId : string)
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

  function getTopResData()
  {
    Helper.getRestaurantData(resId)
      .then((result : any) =>
      {
        setTopResImg(result.resImg)
        setTopResName(result.name)
        setTopResLoc(result.location)
        setTopResRating(result.rating)
      })
  }

  useEffect(() =>
  {
    getResLikes(resId)
    getTopResData()
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('ResDetail',{res_id : resId,res_name:topResName})}
      activeOpacity={0.6}
      style={[styles.htrItemMainCont , {
        marginStart: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.htrItemSubCont}>
        {topResImg != "" ?
          <View style={styles.htrItemImgCont}>
            <Image
              style={styles.htrItemImg}
              source={{ uri : topResImg }} />
          </View> : null}
        <TouchableOpacity
          onPress={() => checkTopResLikes(resId)}
          activeOpacity={0.6}
          style={[styles.htrHeartIconCont,{backgroundColor:themedColors.iconBgColor}]}>
          {checkResLike ?
            <FontAwesome
              color={themedColors.red}
              name={"heart"}/> :
            <FontAwesome
              color={themedColors.primaryIconColor}
              name={"heart-o"}/>}
        </TouchableOpacity>
        <View style={[styles.htrItemNameCont,{backgroundColor:themedColors.transparent}]}>
          <View>
            <AppText
              style={[styles.htrItemNameTxt,{color:themedColors.white}]}
              numberOfLine={1}
              text={topResName != '' ? topResName : ''}/>
          </View>
          <View style={styles.htrItemTxtCont}>
            <View>
              <Ionicons
                color={themedColors.white}
                size={14}
                name={"location"}/>
            </View>
            <View style={styles.htrItemLocTxtCont}>
              <AppText
                style={[styles.htrItemLocTxt,{color:themedColors.white}]}
                numberOfLine={1}
                text={topResLoc != '' ? topResLoc : ''}/>
            </View>
          </View>
          <View style={styles.htrItemStarCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.htrItemRateTxtCont}>
              <AppText
                style={[styles.htrItemRateTxt,{color:themedColors.white}]}
                text={topResRating != 0 ? topResRating.toFixed(1) : "0.0"}/>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  htrItemMainCont : {
    flex:1,
    width : 150,
    marginTop:SPACE.md,
    marginBottom:SPACE.md,
  },
  htrItemSubCont : {
    flex:1,
    borderRadius:BORDER_RADIUS.lg,
  },
  htrItemImgCont : {
    flex:1
  },
  htrItemImg : {
    width:'100%',
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
    height:280
  },
  htrHeartIconCont : {
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
  htrItemNameCont : {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginBottom:SPACE.sm,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE.sm,
    paddingEnd:SPACE.xl,
  },
  htrItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  htrItemLocTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  htrItemStarCont : {
    alignItems:'center',
    flexDirection:'row',
  },
  htrItemRateTxtCont : {
    marginStart:SPACE._2xs,
  },
  htrItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  htrItemTxtCont : {
    flex:1,
    alignItems:'center',
    flexDirection:'row'
  },
  htrItemLocTxtCont : {
    flex:1,
    marginStart:SPACE._2xs,
    marginEnd:SPACE._2xs
  }
})
