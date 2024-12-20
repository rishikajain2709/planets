import axios from 'axios';



export const fetchCarbonDioxide = async() => {
   try{
    const response = await axios.get('https://global-warming.org/api/co2-api')
    return response.data.co2
   } catch(error){
    console.log('Error in fetching carbon dioxide data:', error);
    return null;
   }  
}

export const fetchMethane = async() => {
   try{
      const response = await axios.get('https://global-warming.org/api/methane-api')
      return response.data.methane
   } catch(error) {
      console.log('Error in fetching methane data:', error)
      return null;
   }
}

export const fetchNitrousOxide = async() => {
   try{
      const response = await axios.get('https://global-warming.org/api/nitrous-oxide-api')
      return response.data.nitrous
   } catch(error) {
      console.log('Error in fetching nitrous oxide data:', error)
   }
}

export const fetchTemperature = async() => {
   try{
      const response = await axios.get('https://global-warming.org/api/temperature-api')
      return response.data.result
   } catch(error){
      console.log('Error in fetching temperature data:', error)
   }
}

export const fetchIce = async() => {
   try{
      const response = await axios.get('https://global-warming.org/api/arctic-api')
      return response.data.arcticData.data
   } catch(error) {
      console.log('Error in fetching ice data:', error)
   }
}

export const fetchOcean = async() => {
   try{
      const response = await axios.get('https://global-warming.org/api/ocean-warming-api')
      return response.data.result
   } catch(error) {
      console.log('Error in fetching ocean data:',error)
   }
}

export const fetchForest = async() => {
   try{
      const response = await axios.get('https://api.worldbank.org/v2/countries/1W/indicators/AG.LND.FRST.K2')
      const xmlData = response.data;
      const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
      const jsonData = xmlToJson(xmlDoc);
      const jsonForestData = jsonData['wb:data'];
      return jsonForestData;
   } catch(error) {
      console.log('Error in fetching forest area data:', error)
   }
}

function xmlToJson(xml) {
   var obj = {}
   if (xml.nodeType == 1) { 
      //se l'elemento ha attributi, li aggiunge all'oggetto
      if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
      }
   } else if (xml.nodeType == 3) {
         return xml.nodeValue;
   }

   if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          //se il nodo figlio è già stato incontrato, lo aggiunge a un array
          if (typeof(obj[nodeName]) == "undefined") {
              obj[nodeName] = xmlToJson(item);
          } else {
              if (typeof(obj[nodeName].push) == "undefined") {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
          }
      }
   }
   return obj;
}

export const fetchData = async() => {
   try{
      const carbonDioxideData = await fetchCarbonDioxide();
      const methaneData = await fetchMethane();
      const nitrousOxideData = await fetchNitrousOxide();
      const temperatureData = await fetchTemperature();
      const iceData = await fetchIce();
      const oceanData = await fetchOcean();
      const forestData = await fetchForest();
      
      const recentData = {
         carbonDioxide: calculateRecentValue(carbonDioxideData),
         methane: calculateRecentValue(methaneData),
         nitrousOxide: calculateRecentValue(nitrousOxideData),
         temperature: calculateRecentValue(temperatureData),
         ice: calculateRecentValue(iceData),
         ocean: calculateRecentValue(oceanData),
         forest: calculateRecentValue(forestData)
      }

      return { recentData, allData: {carbonDioxideData, methaneData, nitrousOxideData, temperatureData, iceData, oceanData, forestData} };
   } catch(error){
      console.log('Error', error)
      return { recentData: null, allData: null };
   }
}

const calculateRecentValue = (data) => {
   if (typeof data === 'object' && !Array.isArray(data)) {
      const years = Object.keys(data);
      const latestYear = years[years.length - 1];
      return data[latestYear]
   } else{
      if (Array.isArray(data)) {
         if (data.length > 0) {
            const latestData = data[data.length - 1];
            return latestData;
         }
      }
      console.log('Error to calculate the last recent value.');
      return null;
   }
}