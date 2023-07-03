import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts, GILROY, MONTSERRAT } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { resCatObj } from "../../../models/res_model/CategoryModel";
import database from "@react-native-firebase/database";
import colors from "../../../config/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Helper from "../../../helper/Helper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  index : number,
  length : number,
  item : resCatObj
}

type categorySubNavProp = StackNavigationProp<AllScreenStackParamList>;

export const CategorySubItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<categorySubNavProp>();
  const { foodCatResId } = props.item;
  const [catSubResImg,setCatSubResImg] = useState('');
  const [catSubResName,setCatSubResName] = useState('');
  const [catSubResRating,setCatSubResRating] = useState(0);
  const [catSubResLoc,setCatSubResLoc] = useState('')
  const [checkCatSubResLike,setCheckCatSubResLike] = useState(false);

  function checkCatSubLikes(resId : string)
  {
    Helper.checkResLikes(resId)
      .then((result : any) =>
      {
        if (result == null)
        {
          catSubLikes(resId)
        }
        else
        {
          removeCatSubLike(resId)
        }
      })
  }

  function getCatSubLikes(resId : string)
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
        setCheckCatSubResLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("SEARCH_RES_ERROR : " + e);
    }
  }

  function catSubLikes(resId : string)
  {
    Helper.resLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getCatSubLikes(resId)
        }
      })
  }

  function removeCatSubLike(resId : string)
  {
    Helper.removeResLike(resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          catSubLikes(resId)
        }
      })
  }

  function getLikeCatSubData(resId : string)
  {
    Helper.getRestaurantData(resId)
      .then((result : any) =>
      {
        setCatSubResImg(result.resImg)
        setCatSubResName(result.name)
        setCatSubResLoc(result.location)
        setCatSubResRating(result.rating)
      })
  }

  useEffect(() =>
  {
    getCatSubLikes(foodCatResId)
    getLikeCatSubData(foodCatResId)
  },[])


  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('ResDetail',{res_id : foodCatResId,res_name:catSubResName})}
      activeOpacity={0.6}
      style={styles.csItemMainCont}>
      <View style={styles.csItemSubCont}>
        <View style={[styles.csItemImgCont,{backgroundColor:themedColors.cardBgColor}]}>
          {catSubResImg != '' ?
            <Image
              style={styles.csItemImg}
              source={{uri : catSubResImg}} /> :
            <View style={[styles.csItemImg]}>
              <Ionicons
                color={themedColors.primaryIconColor}
                size={26}
                name={"images"}/>
            </View>}
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.csHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkCatSubResLike ?
            <MaterialCommunityIcons
              size={15}
              color={themedColors.red}
              name={"cards-heart"}/> :
            <MaterialCommunityIcons
              color={themedColors.primaryIconColor}
              size={15}
              name={"cards-heart-outline"}/>}
        </TouchableOpacity>
        <View style={[styles.csItemNameCont,{backgroundColor:themedColors.transparent}]}>
          <View>
            <AppText
              style={[styles.csItemNameTxt,{color:themedColors.white}]}
              numberOfLine={1}
              text={catSubResName != '' ? catSubResName : ''} />
          </View>
          <View style={styles.csItemTxtCont}>
            <View>
              <Ionicons
                color={themedColors.white}
                size={15}
                name={"location"}/>
            </View>
            <View style={styles.csItemLocTxtCont}>
              <AppText
                style={[styles.csItemDesTxt,{color:themedColors.white}]}
                numberOfLine={1}
                text={catSubResLoc != '' ? catSubResLoc : ''} />
            </View>
          </View>
          <View style={styles.csItemStarCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.csItemRateTxtCont}>
              <AppText
                style={[styles.csItemRateTxt,{color:themedColors.white}]}
                text={"0.0"}/>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  csItemMainCont : {
    flex:1,
    maxWidth:'50%',
  },
  csItemSubCont : {
    flex:1,
    margin:SPACE._2xs,
    borderRadius:BORDER_RADIUS.lg,
  },
  csItemImgCont : {
    flex:1,
    borderRadius:BORDER_RADIUS.lg
  },
  csItemImg : {
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
    height:280
  },
  csHeartIconCont : {
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
  csItemNameCont : {
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
  csItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  csItemDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  csItemStarCont : {
    alignItems:'center',
    flexDirection:'row',
  },
  csItemRateTxtCont : {
    marginStart:SPACE._2xs,
  },
  csItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  csItemTxtCont : {
    flex:1,
    alignItems:'center',
    flexDirection:'row'
  },
  csItemLocTxtCont : {
    marginTop:1,
    marginStart:SPACE._2xs,
    marginEnd:SPACE._2xs
  }
})
