const crypto = require('crypto');
const {promisify} = require('util');
const db = require('../models');
const Report = db.reports;
const Weather = db.weather;
const Op = db.sequelize.Op;
const Axios = require('axios');

exports.createReport = async (req,res) => {
    try{
        const report_info = {
            client_id:req.body.client_id,
            incident_desc:req.body.incident_desc,
            city:req.body.city,
            country:req.body.country,
            weather_id:0  
        }
    
        const result = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.country}&APPID=${process.env.GEOLOCATION_API}`);     
        if(result){
            const the_result = result.data;
            const weather_info = {    
                type:the_result?.weather[0]?.description,
                days:the_result?.weather[0]?.icon   
            }
            const created_weather = await Weather.create(weather_info);
            if(created_weather){     
                report_info.weather_id = +created_weather.id;
                const new_report_info = {
                    ...report_info,
                    clientId:report_info.client_id,
                    weatherId:report_info.weather_id
                }
                const created_report = await Report.create(new_report_info);
                if(created_report){
                    const found_report = await Report.findByPk(created_report.id,{include:['client','weather_report']});
                    if(found_report){
                        return res.status(200).json({
                            success:true,
                            message:"The report has been created successfully",
                            data:{
                                id:found_report.id,
                                incident_desc:found_report.incident_desc,
                                city:found_report.city,
                                country:found_report.country,
                                date:found_report.createdAt,
                                client:{
                                    id:found_report.client.id,
                                    name:found_report.client.name
                                },
                                weather_report:{
                                    id:found_report.weather_report.id,
                                    type:found_report.weather_report.type,
                                    days:found_report.weather_report.days
                                }
                            }
                        })
                    }
                    return res.status(400).json({
                        success:false,
                        message:"The report has not been found successfully."
                    })
                }
                return res.status(400).json({
                    success:false,
                    message:"The report has not been created successfully"
                })
            }
            return res.status(400).json({
                success:false,
                message:"The weather was not been created successfully"
            })
        }
        return res.status(400).json({
            success:false,
            message:"The weather information was not retreived from the third party api successfully."
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:`Server Error: ${err}`
        })
    }   
}

exports.listReports = async (req,res) => {
    try{
        const all_reports = await Report.findAll({include:['client','weather_report']});
        if(all_reports){
            return res.status(200).json({
                success:true,
                message:"All reports were retreived successfully",
                data:all_reports.map(found_report => {
                    return {
                        id:found_report.id,
                        incident_desc:found_report.incident_desc,
                        city:found_report.city,
                        country:found_report.country,
                        date:found_report.createdAt,
                        client:{
                            id:found_report.client.id,
                            name:found_report.client.name
                        },
                        weather_report:{
                            id:found_report.weather_report.id,
                            type:found_report.weather_report.type,
                            days:found_report.weather_report.days
                        }
                    }
                })
            })
        }
    }catch(err){
        return res.status(200).json({
            success:false,
            message:`Server Error: ${err}`     
        })
    }
}
