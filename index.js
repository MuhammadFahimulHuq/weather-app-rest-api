const PORT = process.env.PORT  || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors=require('cors')

const information = []
const details = []
const app = express()
app.use(cors())
const deleteInfo=(info) =>{
    if(info){
        const len = info.length
         for(let i =0; i<len;i++){
             info.pop()
         }
       } 
}
app.get('/',(req,res)=>{
    res.json("Welcome to weather app")
})
const address = "https://www.accuweather.com/en/bd/dhaka/28143/weather-forecast/28143"
app.get('/weather',async(req,res)=>{
    axios.get(address)
        .then(async response =>{
            const html = response.data
            const $ = cheerio.load(html)
            const temp = $('.temp',html).text().slice(0,4)
            const time = $('.cur-con-weather-card__subtitle',html).text().slice(5).slice(0,8)
            const temp_phrase= $('.spaced-content').children('.phrase').text()
            const image ="https://www.accuweather.com"+ $('.weather-icon').attr('src')
            const title = $('.cur-con-weather-card__title').text().slice(5).slice(0,15)
            const date = $('.date-wrapper').children('.date').text()
            const dateOfWeek = $('.date-wrapper').children('.day-of-week').text()
            
            deleteInfo(information)
        
            information.push({
                    title,
                    temp,
                    time,
                    temp_phrase,
                    image,
                    dateOfWeek,
                    date
                    
            })
            $('.allergy').each((i)=>{
                const allergy_name = $('.allergy-name').eq(i).text()
                const allergy_value = $('.allergy-value').eq(i).text()
                const allergy_image = "https://www.accuweather.com"+$('.allergy-icon').eq(i).attr('src')
                information.push({
                        allergy_name,
                        allergy_value,
                        allergy_image
                }) 
            })
            $('.weather-card').each((i)=>{
                const cardtitle = $('.card-header').children('h2').eq(i).text().replace('\n\t\t\t','').replace('\n\t\t\t','')
                const cardimage = "https://www.accuweather.com"+$('.forecast-container').children('.icon-weather').eq(i).attr('src')
                const cardtemp = $('.temp-container').children('.temp').eq(i).text()
                const cardtempphrase= $('.card-content').children('.phrase').eq(i).text()
                information.push({
                    cardtitle,
                    cardimage,
                    cardtemp,
                    cardtempphrase
                })
            })
            res.json(information)
        }).catch(error =>{
            console.log(error)
            
        })
      
})
app.get('/currentairquality',async(req,res)=>{
    try{
        await axios.get("https://www.accuweather.com/en/bd/dhaka/28143/air-quality-index/28143")
        .then(async response =>{
            const html = response.data
            const $ = cheerio.load(html)
      
            const airqcondition = $('.air-quality-data').children('.category-text').eq(0).text()
            const aqinum = $('.aq-number').eq(0).text().replace('\n\t\t\t\t\t\t','').replace('\n\t\t\t\t\t','')
            const aqstatement = $('.air-quality-data').children('.statement').eq(0).text().replace('\n\t\t\t\t\t','').replace('\n\t\t\t\t').replace('undefined','')
            
            deleteInfo(information)
            information.push({
            airqcondition,
            aqinum,
            aqstatement,
        
                 })
                return await res.json(information)
                })
            }
            catch(err){
            console.log(err)
}
    
    
     
})
app.get('/pollutants',async(req,res)=>{
    axios.get("https://www.accuweather.com/en/bd/dhaka/28143/air-quality-index/28143")
        .then(async response =>{
            const html = response.data
            const $ = cheerio.load(html)

        

            $('.display-type',html).each(function(i){
                const title = $(this).text().replace('\n\t\t\t','').replace('\n\t\t','')
                const index = $('.mobile-middle').children('.pollutant-index').eq(i).text()
                const concentration = $('.mobile-middle').children('.pollutant-concentration').eq(i).text()
                const alert = $('.column').children('.category').eq(i).text()
                const statement = $('.statement-wrapper').children('.statement').eq(i).text().replace('\n\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t  \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\n\t\t\t\t\t\t\t\t\t','').replace('\t\t\t\t\n\t\t\t\t\t\n\t\t\t','')
                .replace('\n\t\t\t\t\t\n','').replace('\t','')
                const link = $('.statement').children('.statement-link').attr('href')
               

                information.push({
                    title,
                    index,
                    concentration,
                    alert,
                    statement,
                    link
                    
                })
     
            })
            res.json(information)
           
        }).catch((error)=>console.log(error))
        
})

 app.get('/hourlyweather',async (req,res) =>{
    axios.get("https://www.accuweather.com/en/bd/dhaka/28143/hourly-weather-forecast/28143")
        .then(async response =>{
            const html = response.data
            const $ = cheerio.load(html)
            
            $('.date').each((i)=>{
                const time = $('.date').children('span').eq(i*2).text()
                const date =$('.date').children('span').eq((i*2)-1).text().replace('\n\t\t\t','').replace('\n\t\t','')
                const temp = $('.hourly-card-nfl-header').children('.temp').eq(i).text().replace('\n\t\t','').replace('\n\t','')
                const raindroppercentage = $('.precip').eq(i).text().replace('\n\t\t\n\t\t','').replace('\n\t','')
                const phrase = $('.phrase').eq(i).text().replace('\n\t\t\t','').replace('\n\t\t','')
                const wind =$('.value').slice(2,$('.value').length+1).eq(i*9).text()
                const wind_gusts =$('.value').slice(2,$('.value').length+1).eq((i*9)+1).text()
                const humidity =$('.value').slice(2,$('.value').length+1).eq((i*9)+2).text()
                const indoor_humidity =$('.value').slice(2,$('.value').length+1).eq((i*9)+3).text()
                const air_quality =$('.value').slice(2,$('.value').length+1).eq((i*9)+4).text()
                const dew_point =$('.value').slice(2,$('.value').length+1).eq((i*9)+5).text()
                const cloud_cover =$('.value').slice(2,$('.value').length+1).eq((i*9)+6).text()
                const visibility =$('.value').slice(2,$('.value').length+1).eq((i*9)+7).text()
                const cloud_ceiling =$('.value').slice(2,$('.value').length+1).eq((i*9)+8).text()
                const image ="https://www.accuweather.com"+ $('.hourly-card-nfl-header').children('.icon').eq(i).attr('data-src')
                information.push({
                    time,
                    date,
                    temp,
                    raindroppercentage,
                    phrase,
                    wind,
                    wind_gusts,
                    humidity,
                    indoor_humidity,
                    air_quality,
                    dew_point,
                    cloud_cover,
                    visibility,
                    cloud_ceiling,
                    image

                })
            })
            res.json(information)
    }).catch((error)=>console.log(error))
   
 })
 
 app.get('/dailyweather',async (req,res)=>{
    axios.get("https://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143")
        .then(async response =>{
            
            const html = response.data
            const $ = cheerio.load(html)
            const title=$('.content-module').children('.module-title').text()

            details.push({
                title
            })
            $('.daily-forecast-card').each((i)=>{
                const days = $('.date').children('.dow').eq(i).text()
                const date = $('.date').children('.sub').eq(i).text()
                const image = "https://www.accuweather.com"+$('.icon').eq(i).attr('data-src')
                const phrase = $('.daily-forecast-card').children('.phrase').eq(i).text().replace('\n\t\t\t\t','').replace('\n\t\t\t','')
                const htemp = $('.temp').children('.high').eq(i).text()
                const ltemp = $('.temp').children('.low').eq(i).text().replace('/','')
                const raindroppercentage = $('.precip').eq(i).text().replace('\n\t\t\n\t\t','').replace('\n\t','')
                details.push({
                    days,
                    date,
                    image,
                    phrase,
                    htemp,
                    ltemp,
                    raindroppercentage,
                   
                })
               
            })
            res.json(details)
        } ).catch((error)=>console.log(error))
 
})

app.listen(PORT,()=>{
    console.log('server running on Port 8000')
})