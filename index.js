// const gapi = require('gapi-client');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/presentations.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Slides API.
  authorize(JSON.parse(content), listSlides);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
      console.log(gapi)
    });
  });
}

/**
 * Prints the number of slides and elements in a sample presentation:
 * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listSlides(auth) {
  const slides = google.slides({version: 'v1', auth});
  var presentationId = '1I9UmfY8cpIDCg6KU7NFV5nUBbmxOeYtaGXpj4SeZ3gc'
  slides.presentations.get({
    presentationId: presentationId,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const length = res.data.slides.length;
    console.log('The presentation contains %s slides:', length);
    res.data.slides.map((slide, i) => {
      console.log(`- Slide #${i + 1} contains ${slide.pageElements.length} elements.`);
      console.log(`- Slide #${i + 1} id is ${slide.objectId}`)
      
      var link = ('Link: https://docs.google.com/presentation/d/' + presentationId + '/edit#slide=id.' + slide.objectId);
      // console.log(link)
      console.log(auth)
      console.log(res.data.slides.presentations)
      return res.data.slides.pages.getThumbnail({
        "presentationId": "1I9UmfY8cpIDCg6KU7NFV5nUBbmxOeYtaGXpj4SeZ3gc",
        "pageObjectId": "p",
        "thumbnailProperties.thumbnailSize": "LARGE"
      })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });

    });
  });
}

// function downloadPresentation(id) {
//   var slideIds = getSlideIds(id);
//   console.log(slideIds)

//   // for (var i = 0, slideId; slideId = slideIds[i]; i++) {
//   //   downloadSlide('Slide ' + (i + 1), id, slideId);
//   // }
// }

// function downloadSlide(name, presentationId, slideId) {
//   var url = 'https://docs.google.com/presentation/d/' + presentationId +
//     '/export/png?id=' + presentationId + '&pageid=' + slideId; 
//   // var options = {
//   //   headers: {
//   //     Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
//   //   }
//   // };
//   var response = UrlFetchApp.fetch(url, auth);
//   var image = response.getAs(MimeType.PNG);
//   image.setName(name);
//   DriveApp.createFile(image);
// }

// function getSlideIds(presentationId) {
//   // var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId;
//   // // var options = {
//   // //   headers: {
//   // //     Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
//   // //   }
//   // // };
//   // var response = UrlFetchApp.fetch(url, auth);
//   var link = ('Link: https://docs.google.com/presentation/d/' + presentationId + '/edit#slide=id.' + slide.objectId)


//   var slideData = JSON.parse(response);
//   return slideData.slides.map(function(slide) {
//     return slide.objectId;
//   });
// }