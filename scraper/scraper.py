import os
from bs4 import BeautifulSoup
import pandas as pd

# Function to scrape products from saved HTML files for Vegas.pk
def scrape_vegas_from_file():
    categories = {
        'face-serum': 'Face Serum',
        'Cleanser': 'Cleanser',
        'Moisturizer': 'Moisturizer',
        'Sunscreen': 'Sunscreen',
        'face-masks': 'Face Masks'
    }
    products = []

    for category, category_name in categories.items():
        file_name = f'vegas_{category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='product')

            for product in product_list:
                try:
                    name = product.find('h2', class_='product-name').text.strip()
                    brand = product.find('span', class_='brand-name').text.strip() if product.find('span', class_='brand-name') else 'No brand'
                    price = product.find('span', class_='price').text.strip()
                    image = product.find('img', class_='product-image')['src']

                    products.append({
                        'Name': name,
                        'Brand': brand,
                        'Price': price,
                        'Category': category_name,
                        'Image': image
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    # Save to CSV
    df = pd.DataFrame(products)
    df.to_csv('vegas_products_from_html.csv', index=False)
    print("Data scraped from Vegas HTML files.")

# Function to scrape products from saved HTML files for HeyGirl.pk
def scrape_heygirl_from_file():
    categories = {
        'face-care': 'Face Care',
        'sunscreen': 'Sunscreen'
    }
    products = []

    for category, category_name in categories.items():
        file_name = f'heygirl_{category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='product-grid-item')

            for product in product_list:
                try:
                    name = product.find('div', class_='product-title').text.strip()
                    price = product.find('span', class_='money').text.strip()
                    image = product.find('img', class_='product-image')['src']

                    products.append({
                        'Name': name,
                        'Price': price,
                        'Category': category_name,
                        'Image': image
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    # Save to CSV
    df = pd.DataFrame(products)
    df.to_csv('heygirl_products_from_html.csv', index=False)
    print("Data scraped from HeyGirl HTML files.")

# Function to scrape products from saved HTML files for The Skin Fit
def scrape_skinfit_from_file():
    categories = {
        'moisturizer': 'Moisturizer',
        'facial-treatments': 'Facial Treatments',
        'cleansers': 'Cleansers',
        'face-masks': 'Face Masks',
        'sun-protection': 'Sun Protection'
    }
    products = []

    for category, category_name in categories.items():
        file_name = f'skinfit_{category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='product-item')

            for product in product_list:
                try:
                    name = product.find('h2', class_='product-title').text.strip()
                    price = product.find('span', class_='price').text.strip()
                    image = product.find('img', class_='product-image')['src']

                    products.append({
                        'Name': name,
                        'Price': price,
                        'Category': category_name,
                        'Image': image
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    # Save to CSV
    df = pd.DataFrame(products)
    df.to_csv('skinfit_products_from_html.csv', index=False)
    print("Data scraped from The Skin Fit HTML files.")

# Function to scrape products from saved HTML files for Allure
def scrape_allure_from_file():
    categories = {
        'cleanser': 'Cleanser',
        'skin-care-mask': 'Skin Care Mask',
        'skin-care-moisturizer': 'Skin Care Moisturizer',
        'sunscreen': 'Sunscreen',
        'serum': 'Serum'
    }
    products = []

    for category, category_name in categories.items():
        file_name = f'allure_{category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='product-grid-item')

            for product in product_list:
                try:
                    name = product.find('div', class_='product-title').text.strip()
                    price = product.find('span', class_='money').text.strip()
                    image = product.find('img', class_='product-image')['src']

                    products.append({
                        'Name': name,
                        'Price': price,
                        'Category': category_name,
                        'Image': image
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    # Save to CSV
    df = pd.DataFrame(products)
    df.to_csv('allure_products_from_html.csv', index=False)
    print("Data scraped from Allure HTML files.")

# Main function to call the scrapers
def main():
    scrape_vegas_from_file()
    scrape_heygirl_from_file()
    scrape_skinfit_from_file()
    scrape_allure_from_file()
    print("Scraping completed!")

if __name__ == "__main__":
    main()
