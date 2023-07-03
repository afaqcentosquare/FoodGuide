import NetInfo from "@react-native-community/netinfo";

async function CheckInternet()
{
  return new Promise((resolve, reject) =>
  {
    NetInfo.addEventListener(networkState =>
    {
      resolve(networkState.isConnected);
    });
  })

}

export default {
  CheckInternet
}
