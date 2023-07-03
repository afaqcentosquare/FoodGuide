import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
//import {RNFFmpeg} from 'react-native-ffmpeg';


async function saveVideoCustomDir(videoPathData : any)
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            CameraRoll.save(videoPathData, {type: "video", album: 'FoodGuide'})
              .then((result) =>
              {
                  resolve(result)
                  console.log("RESULT : " + result);
              })
        })


    }
    catch (e)
    {
        console.log("SAVE_VIDEO_CUSTOM_DIR : " + e);
    }

}

async function getVideosCustomDir()
{
    try
    {
        return new Promise((resolve,reject) =>
        {
            RNFS.readDir("/storage/emulated/0/Android/media/com.cloudresume/CloudResume/Videos/")
                .then((result) =>
                {
                    //console.log('GOT RESULT', result);
                    resolve(result);
                    // stat the first file
                    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
                })
                .then((statResult) =>
                {
                    if (statResult[0].isFile())
                    {
                        // if we have a file, read it
                        return RNFS.readFile(statResult[1], 'base64');
                    }

                    return 'no file';
                })
                .then((contents) =>
                {
                    // log the file contents
                    //console.log(contents);
                })
                .catch((err) =>
                {
                    console.log(err.message, err.code);
                });
        })

    }
    catch (e)
    {
        console.log("GET_VIDEO_CUSTOM_DIR : " + e);
    }

}

export default {
    saveVideoCustomDir,
    getVideosCustomDir
}
