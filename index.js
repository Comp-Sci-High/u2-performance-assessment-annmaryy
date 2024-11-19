const prompt = require('prompt-sync')()

async function main() {

    console.log('Welcome to Trip Advisor Chatbot!');
    let isRunning = true;

    while (isRunning) {
        const tripName = prompt("Where would you like to travel to? ")

        console.log('What recommendations would you like?');
        console.log('1. Hotels');
        console.log('2. Restaurants');
        console.log('3. Attractions');
        console.log('4. Exit');
        const choice = prompt('Enter the number of your choice: ');

        if (choice === '1') {
            await fetchTrip('hotels', tripName);
        } else if (choice === '2') {
            await fetchTrip('resturants', tripName);
        } else if (choice === '3') {
            await fetchTrip('attractions', tripName);
        } else if (choice === '4') {
            isRunning = false;
            console.log('Thank you for using the Trip Advisor ChatBot. Goodbye!');
        } else {
            console.log('Invalid choice. Please enter a number between 1 and 4.');
        }
        await generateImage({
            "prompt": "Resort in "+tripName,
            "n": 1,
            "size": "1024x1024"
        })
    }
}

async function fetchTrip(category,searchQuery) {
    let tripAdvisorURL = 'https://api.content.tripadvisor.com/api/v1/location/search?category='+category +"&searchQuery="+searchQuery+'&key=D92D9D404CF64DC1BAA3B371E4219D00'

    const response = await fetch(tripAdvisorURL)
    const data = await response.json()
    console.log(data)
    return data
}


let imageURL = 'https://api.openai.com/v1/images/generations'

async function generateImage(imageData) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
    }
    const response = await fetch(imageURL, options);
    const data = await response.json();
    console.log(data)
}
main()




async function fetchData(url) {
    let imageURL = 'https://api.openai.com/v1/images/generations'
    try {
        const response = await fetch(url);    
    if(response.ok === false){
        console.log("HTTP error! Status: "+ response.status)
      }
        const data = await response.json();
      
        console.log(data);
        return data;
        }catch(error){
          console.log("An error has occurred:"+ error.message)
        }
    }

    fetchData(imageURL);
   

async function fetchData(url) {
    try {
        const response = await fetch(url);    
    if(response.ok === false){
        console.log("HTTP error! Status: "+response.status)
      }
        const data = await response.json();
      
        console.log(data);
        return data;
        }catch(error){
          console.log("An error has occurred:"+error.message)
        }
    }

    fetchData(tripAdvisorURL);
    