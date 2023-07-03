import React from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { TextHeader } from "../../components/headers/TextHeader";
import { Fonts } from "../../../config";
import { ProfileCard } from "../../components/ProfileCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Strings from "../../../config/strings";
import auth from "@react-native-firebase/auth";
import { DefaultUserImg } from '../../components/DefaultUserImg';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {}

type profileNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ProfileView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<profileNavProp>();
  const {themedColors} = usePreferredTheme();
  const profileHeadTxt = Strings.header;
  const profileTxt = Strings.Profile;
  const editUser = useSelector((state: RootState) => state.EditUser);
  const {
    editUserImg,
    editUserLoc,
    editUserName
  } = editUser

  return(
    <View style={[styles.profileMainCont,{backgroundColor:themedColors.bgColor}]}>
      <View style={[styles.profileHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
        <TextHeader
          txtHeadCont={styles.profileHeadCont}
          title={profileHeadTxt.profileHeadTxt}
          titleTxtVisible={true}/>
      </View>
      <ScrollView>
        <View style={[styles.profileInfoMainCont,{backgroundColor:themedColors.cardBgColor}]}>
          <View>
            <View style={styles.profileInfoImgCont}>
              {editUserImg != '' ?
                <Image
                  style={styles.profileInfoImg}
                  source={{ uri: editUserImg }} /> :
                <DefaultUserImg showAddIcon={false}/>}
            </View>
            <View>
              <View style={styles.profileNameTxtCont}>
                <AppText
                  style={[styles.profileNameTxt,{color:themedColors.primaryTxtColor}]}
                  text={editUserName != '' ? editUserName : ''}/>
              </View>
              <View style={styles.profileDesTxtCont}>
                <AppText
                  style={[styles.profileDesTxt,{color:themedColors.secondaryTxtColor,}]}
                  text={editUserLoc != '' ? editUserLoc : ''}/>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.profileSelectCont,{backgroundColor:themedColors.cardBgColor}]}>
          <ProfileCard
            iconType={MaterialCommunityIcons}
            iconName={"account-edit-outline"}
            profileCardClick={() => navigation.navigate('EditProfile')}
            profileCardTxt={profileTxt.edtProfileTxt}/>
          <ProfileCard
            iconType={Ionicons}
            iconName={"cart"}
            profileCardClick={() => navigation.navigate('AddToCart')}
            profileCardTxt={profileTxt.cartProfileTxt}/>
          <ProfileCard
            iconType={Ionicons}
            iconName={"reorder-four-outline"}
            profileCardClick={() => navigation.navigate('Order')}
            profileCardTxt={profileTxt.orderProfileTxt}/>
          <ProfileCard
            iconType={MaterialIcons}
            iconName={"favorite-border"}
            profileCardClick={() => navigation.navigate('Favourites')}
            profileCardTxt={profileTxt.wishListProfileTxt}/>
          <ProfileCard
            iconType={MaterialCommunityIcons}
            iconName={"database-arrow-left"}
            profileCardClick={() => navigation.navigate('PrivacyPolicy')}
            profileCardTxt={profileTxt.policyProfileTxt}/>
          <ProfileCard
            iconType={MaterialCommunityIcons}
            iconName={"book-open-variant"}
            profileCardClick={() => navigation.navigate('TermAndCondition')}
            profileCardTxt={profileTxt.termProfileTxt}/>
          <ProfileCard
            profileCardClick={() => {
              auth().signOut();
              navigation.navigate('SignIn')}}
            iconType={MaterialIcons}
            iconName={"logout"}
            profileCardTxt={profileTxt.logoutProfileTxt}/>
        </View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  profileMainCont : {
    flex:1,
  },
  profileHeadCont : {
    paddingTop:0,paddingBottom:0
  },
  profileHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE.md,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  profileHeadInputMainCont : {
    marginTop:SPACE._2md,
    marginBottom:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  profileHeadInputTxtCont : {
    height:40,
  },
  inboxListCont : {
    flex:1,
  },
  profileFollowCountMainCont : {
    flex:1,
    justifyContent:'center',
    flexDirection:'row',
    marginTop:SPACE.xl,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  profileInfoMainCont : {
    marginTop:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginStart:SPACE._2lg,
    paddingStart:SPACE._2xl,
    paddingEnd:SPACE._2xl,
    paddingBottom:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  profileInfoImgCont : {
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2lg
  },
  profileInfoImg : {
    width:100,
    height:100,
    borderRadius:BORDER_RADIUS._8xl
  },
  profileViewLineCont : {
    marginStart:SPACE._2lg,
    justifyContent:'center',
  },
  profileViewLine : {
    width:2,
    height: 40
  },
  profileNameTxtCont : {
    marginTop:SPACE._2lg
  },
  profileNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.lg,
  },
  profileDesTxtCont : {
    marginTop:SPACE._3xs
  },
  profileDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  profileSelectCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE.xl,
    paddingEnd:SPACE._2lg,
    margin:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  }
})
