import feedparser
import json
from bs4 import BeautifulSoup

# specify the URL of the podcast RSS feed you want to convert to JSON
rss_feed = 'https://feeds.acast.com/public/shows/seasiderspod' # Replace this with the URL of the podcast RSS feed

# parse the RSS feed using feedparser
feed = feedparser.parse(rss_feed)

# create an empty list to store the filtered data
filtered_data = []

# iterate over each entry in the feed and extract only the desired fields
for entry in feed.entries:
    filtered_entry = {}
    for key, value in entry.items():
        if 'acast' not in key and 'itunes' not in key and key != 'published_parsed' and key != 'subtitle_detail' and key != 'title_detail' and key != 'summary_detail':
            if key == 'summary':
                # Use BeautifulSoup to remove all HTML tags from the summary field
                soup = BeautifulSoup(value, features="html.parser")
                value = soup.get_text()
            filtered_entry[key] = value
    filtered_data.append(filtered_entry)

# convert the filtered data to formatted JSON format using json
json_data = json.dumps(filtered_data, indent=4)

# save the formatted JSON data to a file
with open('podcast.json', 'w') as file:
    file.write(json_data)
