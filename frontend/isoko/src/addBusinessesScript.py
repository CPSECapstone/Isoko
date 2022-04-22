# -*- coding: utf-8 -*-
import requests
import json
import random

postUrl = 'https://xyalrvt8gb.execute-api.us-west-2.amazonaws.com/Prod/business/'
header = {'Authorization': 'Bearer w04SiPAkQQYABpurA52WK-QrrrQduB1pHgnqtmWoSMJqfKefSsEbONAWqaLqfKBtBRAh70oiQ_niJBsR4pfMwYg7QhOWbYhiRVFrSaSnvh0wCgJdr0F-uy9hix9fYnYx'}
sDesc = ['We make the most scrumdiddlyumptious food in all the lands.', 'This place is not buns!', 'Come enjoy a fancy cocktail with our scenic creek views.', 
'This is the best I\'ve ever had - Drake', 'The first shop of it\'s kind to open up in San Luis Obispo!']
owner = ['Jeanie Kim', 'Lala Piroki', 'Alfa Gueria', 'Robin Growler','Ilana Solari']
ownerDesc = ['I was a renowned chef that decided to open my own business in my hometown and pay homage to my roots.',
            'The most important thing is to keep your roots alive, and that\'s why I decided to open this business.',
            'I watched my dad start this business from the ground up and I was honored to continue his legacy.',
            'I was in a completely different career when I discovered my true passion and opened this business.',
            'The most important thing is family and everyday I am blessed to show up to work and see my smiling family and customers, it doesn\'t feel like work at all!']
minority = [
   ['Black Owned'],
   ['Mexican Owned'],
   ['LGBTQ+ Owned'],
   ['Women Owned'],
   ['Any Minority Owned'],
   ['East Asian Owned'],
   ['South Asian Owned'],
   ['Latinx Owned'],
   ['Indigenous Owned'],
   ['Women Owned', 'Asian Owned'],
   ['Women Owned', 'Black Owned'],
   ['LGBTQ+ Owned', 'Black Owned'],
   ['LGBTQ+ Owned', 'Women Owned'],
   ['South Asian Owned', 'Women Owned']
]

def searchParams(keywords, latitude, longitude):
    URL = "https://api.yelp.com/v3/businesses/search" + '?' + 'latitude=' + str(latitude) + '&longitude=' + str(longitude) + '&term=' + str(keywords[0])
    r = requests.get(url = URL, headers=header)
    data = r.json()
    for i in range(5):
        bus = data['businesses'][i]
        postBody = {
            'name': bus['name'], 
            'city': bus['location']['city'],
            'state': bus['location']['state'],
            'street': bus['location']['address1'],
            'zip': bus['location']['zip_code'],
            'type': 'B&M',
            'tags': minority[random.randint(0, 13)],
            'keywords': keywords,
            'category': bus['categories'][0]['title'],
            'shortDesc': sDesc[i],
            'businessId': bus['id'],
            'hours': {
                'Mon': '9:00am - 11:00pm',
                'Tue': '9:00am - 11:00pm',
                'Wed': '9:00am - 11:00pm',
                'Thu': '9:00am - 11:00pm',
                'Fri': '9:00am - 11:00pm',
                'Sat': '11:00am - 8:00pm',
                'Sun': '11:00am - 8:00pm',
            },
            'aboutOwner': {
                # 'owner': owner[i],
                'ownerName': owner[i],
                'ownerPhone': bus['display_phone'],
                'ownerDesc': ownerDesc[i],
            },
            'verified': True,
            'photoLink': bus['image_url']
        }

        jsonBody = json.dumps(postBody)
        requests.post(url=postUrl, data=jsonBody)
        print(jsonBody)


# Businesses Already Added:
# searchParams(["Pizza"], 35.2930541, -120.68159042)
# searchParams(["Burgers"], 35.2930541, -120.68159042)
# searchParams(["Nail Salon"], 35.2930541, -120.68159042)
# searchParams(["Bar"], 35.2930541, -120.68159042)
# searchParams(["Ice Cream"], 35.2930541, -120.68159042)
# searchParams(["Bakery"], 35.2930541, -120.68159042)

#SLO
#35.2930541, -120.68159042
