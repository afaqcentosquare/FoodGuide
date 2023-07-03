import React, { FC, useEffect, useState } from "react";
import {VideoView} from './VideoView';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { postObj } from "../../../models/res_model/PostModel";
import {
    setFooterLoading,
    setNoMoreData,
    setSelectResName,
    setVideoDataLoad,
} from "../../../redux/slice/VideoSlice";
import { BackHandler } from "react-native";
import { resProfileObj } from "../../../models/res_model/ResModel";

type Props = {}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

const VideoController : FC<Props> = () =>
{
    const navigation = useNavigation<videoNavProp>();
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    let [postVideoList,setPostVideoList] = useState<Array<postObj>>([])
    const [resList,setResList] = useState<Array<resProfileObj>>([])
    let [page,setPage] = useState(1);
    const [selectResId,setSelectResId] = useState('');
   // const { selectResId } = useSelector((state: RootState) => state.Video);

    function handleBackButtonClick()
    {
        navigation.goBack();
        return true;
    }

    function getNumChildren()
    {
        try
        {
            const postRef =
              database()
                .ref()
                .child("Post")
                .orderByChild('resId')
                .equalTo(selectResId)
            postRef.once('value').then((postSnap)  =>
            {
                if(page <= postSnap.numChildren())
                {
                    dispatch(setFooterLoading(true))
                    dispatch(setNoMoreData(false))
                    getVideosData(selectResId)
                }
                else
                {
                    dispatch(setFooterLoading(false))
                    dispatch(setNoMoreData(true))
                }
            })
        }
        catch (e)
        {
            console.log("ERROR : " + e);
        }
    }

    function getVideosData(resId : string)
    {
        try
        {
            const postRef =
              database()
                .ref()
                .child("Post")
                .orderByChild('resId')
                .equalTo(resId)
            postRef.on('value',(postSnap)  =>
            {
                //setPostVideoList([])

                let postArr : Array<postObj>  = []

                // @ts-ignore
                postSnap.forEach((postChildSnap) =>
                {
                    postArr.push(postChildSnap.val())
                })

                setPostVideoList(postArr)
                dispatch(setVideoDataLoad(false))
            })
        }
        catch (e)
        {
            console.log("ERROR : " + e);
        }
    }

    function onReachEnd()
    {
        setPage(page + 1)
        getNumChildren()
    }

    function getResData()
    {
        try
        {
            const postRef =
              database()
                .ref()
                .child("ResProfile")
            postRef.on('value',(resSnap)  =>
            {
                let resArr : Array<resProfileObj>  = []

                // @ts-ignore
                resSnap.forEach((resChildSnap) =>
                {
                    resArr.push(resChildSnap.val())
                })
                setResList(resArr)
                dispatch(setSelectResName(resArr[0].name))
                setSelectResId(resArr[0].resId)
                getVideosData(resArr[0].resId)
                //dispatch(setVideoDataLoad(false))
            })
        }
        catch (e)
        {
            console.log("ERROR : " + e);
        }
    }

    useEffect(() =>
    {
        getResData()

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    },[])

    return(
        <VideoView
          selectClick={(resId) => {
              postVideoList.length = 0
              getVideosData(resId);
          }}
          resList={resList}
          postVideoList={postVideoList}
          onReachEnd={() => onReachEnd()}/>
    )
}

export default VideoController ;
