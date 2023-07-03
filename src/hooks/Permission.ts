import {Platform} from 'react-native';
import {openSettings,requestMultiple, checkMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

async function ReadStoragePermission()
{
    try
    {
        if(Platform.OS === 'ios')
        {
            return new Promise(async (resolve, reject) =>
            {
                await requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY,PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.MICROPHONE,PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY])
                    .then((status) =>
                    {
                        console.log(status);
                        checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY])
                            .then((result) =>
                            {
                                switch (result[PERMISSIONS.IOS.PHOTO_LIBRARY])
                                {
                                    case RESULTS.GRANTED :
                                    {
                                        resolve('granted');
                                        break;
                                    }
                                    case RESULTS.DENIED :
                                    {
                                        resolve('denied');
                                        break;
                                    }
                                    case RESULTS.LIMITED :
                                    {
                                        resolve('limited')
                                        break;
                                    }
                                    case RESULTS.BLOCKED :
                                    {
                                        openSettings();
                                        break;
                                    }
                                }
                            })
                    })
            })
        }
        else if(Platform.OS === 'android')
        {
            return new Promise(async(resolve,reject) =>
            {
                await requestMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.RECORD_AUDIO,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
                    .then((statuses ) =>
                    {
                        checkMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.RECORD_AUDIO,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
                            .then((result) =>
                            {
                                switch (result[PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.RECORD_AUDIO,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
                                {
                                    case RESULTS.GRANTED :
                                    {
                                        resolve('granted');
                                        break;
                                    }
                                    case RESULTS.DENIED :
                                    {
                                        resolve('denied');
                                        break;
                                    }
                                    case RESULTS.BLOCKED :
                                    {
                                        openSettings();
                                        resolve('blocked')
                                        break;
                                    }
                                }
                            })
                    })
            })
        }

    }
    catch (err)
    {
        console.warn(err);
    }
}

export default {
    ReadStoragePermission
}
