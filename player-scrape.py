import requests
from bs4 import BeautifulSoup
import json

def scrape_players_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Scrape goalkeepers' data
        goalkeepers_data = scrape_position_data(soup, 'goalkeepers', 'Goalkeeper', '1')

        # Scrape defenders' data
        defenders_data = scrape_position_data(soup, 'defenders', 'Defender', '2')

        # Scrape midfielders' data
        midfielders_data = scrape_position_data(soup, 'midfielders', 'Midfielder', '3')

        # Scrape forwards' data
        forwards_data = scrape_position_data(soup, 'forwards', 'Forward', '4')

        # Combine the data from all positions
        all_players_data = goalkeepers_data + defenders_data + midfielders_data + forwards_data

        # Create the parent object with the players as children
        players_object = {"players": all_players_data}

        return players_object
    else:
        print(f"Failed to fetch the page. Status code: {response.status_code}")
        return None

def scrape_position_data(soup, position_id, position_name, position_key):
    position_ul = soup.find('ul', id=position_id)
    if position_ul:
        player_articles = position_ul.find_all('article', class_=f"player-card--{position_name}")
        player_data = []
        for article in player_articles:
            num = article.find('div', class_='player-card__number')
            forename = article.find('span', class_='player-card__name')
            forename = forename.get_text(strip=True) if forename else None
            surname = article.find('span', class_='player-card__name--last-name')
            surname = surname.get_text(strip=True) if surname else None
            full_name = f"{forename} {surname}"
            shirt_number = num.get_text(strip=True) if num else None
            player_info = {
                "name": full_name,
                "shirtNumber": shirt_number,
                "position": position_name.lower(),
                "positionKey": position_key,
            }
            player_data.append(player_info)
        return player_data
    else:
        print(f"No {position_name.lower()} found.")
        return []

def save_to_json(data, file_path):
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

if __name__ == "__main__":
    url = "https://www.blackpoolfc.co.uk/squads/"
    file_path = "players_data.json"
    players_data = scrape_players_data(url)

    if players_data:
        save_to_json(players_data, file_path)
        print(f"Player data has been scraped and saved to '{file_path}'.")
    else:
        print("Scraping unsuccessful. Please check the URL or website structure.")
