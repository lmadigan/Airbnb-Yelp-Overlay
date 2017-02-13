from lxml import html
import requests
from bs4 import BeautifulSoup
from flask import Flask
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def process_url(url):
    page = requests.get(url)

    soup = BeautifulSoup(page.text, "lxml")

    lat = soup.find(property="airbedandbreakfast:location:latitude")
    log = lat.next_element.next_element

    lat =lat['content']
    latitude = float(lat[0:8])
    longitude = float(log['content'][0:8])

    return(latitude, longitude)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8801)
