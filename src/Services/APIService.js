import axios from 'axios'
 export const readAxios = async function () {
     let f=new Date()
    let date=f.getFullYear()+'-'+(f.getMonth() + 1)+'-'+(f.getDay() + 1 )
    try {
        let response = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&from=${date}&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98`, {
            
        });

        if (response.status === 200) {
            return response.data
        }
     
    }
    catch (e) {
        return console.log('ErrorRead', e);
    }
}

