// @ts-ignore
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'CloudResume.db' });

async function createVideoTable()
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            db.transaction((txn : any) =>
            {
                txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Videos'", [],
                    (tx : any , res : any) =>
                    {
                        if (res.rows.length === 0)
                        {
                            txn.executeSql('DROP TABLE IF EXISTS Videos', []);
                            txn.executeSql('CREATE TABLE IF NOT EXISTS Videos(id INTEGER PRIMARY KEY AUTOINCREMENT, videoPath VARCHAR)', []);
                            resolve(res.rows.length);
                        }
                        else
                        {
                            resolve(res.rows.length)
                        }
                    },
                );
            });
        })

    }
    catch (e)
    {
        console.log("ERROR : " + e);
    }
}

async function createNfcTable()
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            db.transaction((txn : any) =>
            {
                txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Nfc'", [],
                    (tx : any , res : any) =>
                    {
                        if (res.rows.length === 0)
                        {
                            txn.executeSql('DROP TABLE IF EXISTS Videos', []);
                            txn.executeSql('CREATE TABLE IF NOT EXISTS Nfc(id INTEGER PRIMARY KEY AUTOINCREMENT, nfcTag VARCHAR,date VARCHAR)', []);
                            resolve(res.rows.length);
                        }
                        else
                        {
                            resolve(res.rows.length)
                        }
                    },
                );
            });
        })

    }
    catch (e)
    {
        console.log("NfcERROR : " + e);
    }
}

export default {
    createVideoTable,
    createNfcTable
}
