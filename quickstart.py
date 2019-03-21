from __future__ import print_function
# for downloading images
import urllib
import urlfetch
# google auth
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# HELPFUL
# https://stackoverflow.com/questions/31662455/how-to-download-google-slides-as-images

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/presentations.readonly']

# The ID of a sample presentation.
PRESENTATION_ID = '1I9UmfY8cpIDCg6KU7NFV5nUBbmxOeYtaGXpj4SeZ3gc'

def main():
    """Shows basic usage of the Slides API.
    Prints the number of slides and elments in a sample presentation.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server()
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('slides', 'v1', credentials=creds)

    # Call the Slides API
    presentation = service.presentations().get(
        presentationId=PRESENTATION_ID).execute()
    slides = presentation.get('slides')

    path = '/users/kjwilson/documents/dev/suprez_slides/slide_deck'

    print('The presentation contains {} slides:'.format(len(slides)))
    for i, slide in enumerate(slides):
        print('- Slide #{} contains {} elements.'.format(
            i + 1, len(slide.get('pageElements'))))
        print('- Slide #{} id is : {}'.format(
            i + 1, (slide.get('objectId'))

        ))
        # link to exact slide page
        link = 'Link: https://docs.google.com/presentation/d/' + PRESENTATION_ID + '/edit#slide=id.' + (slide.get('objectId'))
        print(link)

        # Didn't work
        # link to thumbnail
        # Slides.Presentations.Pages.getThumbnail(presentation, slide.get('objectId'), {'thumbnailProperties.thumbnailSize': 'LARGE'})
        # thumbnail = slide.getThumbnail('contentUrl')
        
        # JS Draft Implementation
        # presentation = SlidesApp.openById(presentationId)
        # presentation.getSlides().forEach(function(slide, i) {
        #     slide = presentation.getSlides()[]
        #     var thumbnail = Slides.Presentations.Pages.getThumbnail(presentationId, slide.getObjectId(), {'thumbnailProperties.thumbnailSize': 'LARGE'})
            
        #     var response = UrlFetchApp.fetch(thumbnail.contentUrl)
        #     var blob = response.getBlob()
        #     blob.setName('slide' + (i + 1) + '.png')
        #     var file = DriveApp.createFile(blob)
        #     Logger.log('Created file "%s" for slide number %s', file.getName(), i + 1)
        #     })
        # }

        presentation = service.presentations().get(
        presentationId=PRESENTATION_ID).execute()
    slides = presentation.get('slides')
        # thumbnail = slide.get(presentation, slide.get('objectId'))
        thumbnail = service.presentation.get(slides.get('contentUrl')
        # response = urlfetch.get(thumbnail.contentUrl())

        # urllib.urlretrieve('http://example.com/file.ext', '/path/to/dir/filename.ext')
        urllib.urlretrieve(thumbnail, path)

if __name__ == '__main__':
    main()