import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {RNFFmpeg, RNFFmpegConfig} from 'react-native-ffmpeg';

function saveVideo(videoPath : any)
{

    try
    {
        //let base64Path = "data:video/mp4;base64," + result;
        //let Base64Code = base64Path.split('data:video/mp4;base64,'); //base64Image is my image base64 string
        /* RNFetchBlob.fs.writeFile(filePath,videoPathData).then((result) =>
         {
             resolve('successfull')
         })*/
        /* RNFS.readFile(videoPathData,'base64').then((result) =>
         {

         })*/
        /*CameraRoll.getPhotos({
            first : 200000000,
            assetType : "Videos",
            include : ['fileSize','playableDuration','filename'],
        })
            .then((result) =>
            {
                // @ts-ignore
                setVideoGallery(result.edges);
                handleSnapPress(1)
                setIsSheetOpen(true)
                console.log("VIDEO : " + JSON.stringify(videoGallery));
            })
            .catch((err) =>
            {
                //Error Loading Images
            });*/

        //save video camera roll
        /*CameraRoll.save(videoPath, {type: "video", album: 'CloudResume'})
                .then((result) =>
                {
                    console.log("RESULT : " + result);
                })*/

        //change to base 64
        /*RNFS.readFile(video.path,'base64').then((result) =>
                            {
                                saveVideo(result)
                            })*/

        /*CreateTable.CreateVideoTable().then((result : any) =>
        {
            PostData.PostVideo(videoPath)
                .then((result  : any) =>
                {
                    console.log("Add successfully"  + result);
                })
                .catch((error) =>
                {
                    console.log("Not Save");
                })
        })*/

        const folderPath = RNFS.ExternalStorageDirectoryPath + '/CloudResume/Videos/' ;
        //const base64 = v.split(",").pop();
        const filePath = folderPath  + Date.now().toString() + ".mp4";


        RNFetchBlob.fs.isDir(folderPath).then((isDir : boolean) =>
        {
            if(isDir)
            {
                /* RNFFprobe.execute("-i  " + videoPath + " -vf drawtext=text='\Centered Text'\:x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=white -c:a copy "  + filePath + Date.now() + ".mp4")
                     .then((result) =>
                     {
                         console.log("Response : " + result);
                     })*/
               /* RNFFmpegConfig.setFontconfigConfigurationPath('./src/assets/fonts/')
                RNFFmpeg.executeAsync("-i " + videoPath +  " -vf" + " drawtext=fontfile='/system/fonts/Roboto-Bold.ttf':text='Muhammad Afaq':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=36:fontcolor=white -c:a copy " + folderPath + Date.now() + ".mp4"  , completedExecution =>
                {
                    if (completedExecution.returnCode === 0) {
                        console.log("FFmpeg process completed successfully");
                    } else {
                        console.log(`FFmpeg process failed with rc=${completedExecution.returnCode}.`);
                    }
                }).then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`));*/
                /* RNFFmpeg.executeAsync("-i  " + videoPath + " -vf drawtext=text=\'Centered Text\':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=white -c:a copy "  + filePath + Date.now() + ".mp4" , completedExecution =>
                 {
                     if (completedExecution.returnCode === 0) {
                         console.log("FFmpeg process completed successfully");
                     } else {
                         console.log(`FFmpeg process failed with rc=${completedExecution.returnCode}.`);
                     }
                 }).then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`));*/
                /* RNFetchBlob.fs.createFile(filePath,videoPath,'base64').then(() =>
                 {

                 })*/
            }
            else
            {
                RNFetchBlob.fs.mkdir(folderPath).then(() =>
                {
                    RNFFmpegConfig.setFontconfigConfigurationPath('/assets/fonts/Gilory-Bold.ttf')
                    RNFFmpeg.executeAsync("-i  " + videoPath + " -vf drawtext=text=\'Centered Text\':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=white -c:a copy "  + filePath + Date.now() + ".mp4" , completedExecution =>
                    {
                        if (completedExecution.returnCode === 0) {
                            console.log("FFmpeg process completed successfully");
                        } else {
                            console.log(`FFmpeg process failed with rc=${completedExecution.returnCode}.`);
                        }
                    }).then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`));
                })
            }
        })
    }
    catch (e)
    {
        console.log("SIGN_ERROR : " + e)
    }
}
