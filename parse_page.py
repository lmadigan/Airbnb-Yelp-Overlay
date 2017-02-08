from lxml import html
import requests
from bs4 import BeautifulSoup

def process_url(url)
    # page = requests.get('https://www.airbnb.com/rooms/227430?checkin=02%2F22%2F2017&checkout=02%2F27%2F2017&adults=1&children=0&infants=0&s=w4Cv3ntG')
    page = requests.get(url)

    soup = BeautifulSoup(page.text, "lxml")

    lat = soup.find(property="airbedandbreakfast:location:latitude")
    log = lat.next_element.next_element

    lat =lat['content']
    latitude = float(lat[0:8])
    longitude = float(log['content'][0:8])

    console.log(latitude, longitude)
