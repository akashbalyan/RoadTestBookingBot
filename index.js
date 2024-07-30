
import puppeteer from 'puppeteer';
import axios from 'axios';
import {getNearbyOffices, login, getAppointmentsByID} from './apiCalls.js'
import { config }  from './config.js';

const creds = {
  surname: config.roadtestcreds.surname,
  licensenumber: config.roadtestcreds.licensenumber,
  keyword: config.roadtestcreds.keyword,
};

// Launch the browser and open a new blank page
//const browser = await puppeteer.launch();
//visible ui

const runOnBrowser = async () => {

    const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

// // Navigate the page to a URL.
 await page.goto('https://onlinebusiness.icbc.com/webdeas-ui/home');

// // Set screen size.
await page.setViewport({width: 1080, height: 1024});


// // Wait and click on first result.
await page.locator('text=Next').click();


await page.locator('input').fill(`${creds.surname}`);


await page.locator('input[aria-label="driver-licence"]').fill(`${creds.licensenumber}`);

await page.locator('input[aria-label="keyword"]').fill(`${creds.keyword}`);

const element = await page.waitForSelector('::-p-xpath(/html/body/app-root/app-login/mat-card/mat-card-content/form/span[2]/div[3]/mat-checkbox/label/span[1]/input)');

await element.click();

const sigInButton = await page.waitForSelector('::-p-xpath(/html/body/app-root/app-login/mat-card/mat-card-content/form/div[2]/div[2]/button)');

await sigInButton.click();
}




// // await searchBox.fill('richmond');
// await page.locator('input[aria-label="Number"]').fill('richmond');

// await page.locator('div ::-p-text(Richmond, BC)').click();


// // const option = await page.waitForSelector('::-p-xpath(/html/body/div[2]/div[2]/div/div/mat-option)');
// // console.log(option);
// //await option.click();
// //await page.locator('.mat-option-text').click();
// //await page.locator('mat-option[id=mat-option-88]').click();

// //await page.locator('input[aria-label="Number"]').click();
// // const searchBoxOPtion = await page.waitForSelector('::-p-xpath(/html/body/div[2]/div[2]/div/div/mat-option/span)');
// //  await searchBoxOPtion.click();

// // //await page.locator('text=Richmond, BC').click();

// const searchButton = await page.waitForSelector('::-p-xpath(/html/body/div[2]/div/div/mat-dialog-container/app-search-modal/div/div/form/div[2]/button)');
// await searchButton.click();
// //await page.locator('text=Sign in').click();
// // // Locate the full title with a unique string.
// // const textSelector = await page
// //   .locator('text/Customize and automate')
// //   .waitHandle();
// // const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // // Print the full title.
// // console.log('The title of this blog post is "%s".', fullTitle);

const findNearestApppoinmetAvailable = async () =>{

    const loginResponse = await login();
    const authToken = loginResponse.headers.authorization;
    const examStartDate = loginResponse.data.eligibleExams[0].eed.date;
    const nearbyOffices = await getNearbyOffices(authToken,examStartDate);

    const nearbyOfficesArray = [];
    nearbyOffices.data.forEach(obj => {
        nearbyOfficesArray.push({
            agency : obj.pos.agency,
            posId : obj.pos.posId
        })
    });



    const appointmentsByPosId = await getAppointmentsByID(authToken,275,examStartDate);



    const allAppointments = [];
    for (const el of nearbyOfficesArray) {
        let response = await getAppointmentsByID(authToken, el.posId,examStartDate);

        for(const appointment of response.data){
            appointment.location = el.agency;
            allAppointments.push(appointment);
        }
    }



    const mostRecentAppointment = allAppointments.reduce((latest, current) => {
        const latestDate = new Date(latest.appointmentDt.date);
        const currentDate = new Date(current.appointmentDt.date);
        
        return currentDate < latestDate ? current : latest;
    }, allAppointments[0]);
    
    console.log(mostRecentAppointment);
}

findNearestApppoinmetAvailable();

