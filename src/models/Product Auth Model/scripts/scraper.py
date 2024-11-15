import os
import random
import requests
from bs4 import BeautifulSoup
import pandas as pd

# Function to generate a random rating between 3 and 5 stars
def generate_random_rating():
    return round(random.uniform(3.8, 5), 1)

# Function to fetch and save HTML pages from Allure Beauty
def fetch_allure_html_pages():
    categories = {
        'cleanser': 'Cleanser',
        'skin-care-mask': 'Face Mask',
        'moisturizer': 'Moisturizer',
        'sunscreen': 'Sunscreen',
        'serum': 'Serum'
    }

    base_url = 'https://allurebeauty.pk/collections/{category}'

    for category, category_name in categories.items():
        page = 1
        all_html = ''
        print(f"Fetching Allure category: {category_name}")
        while True:
            url = base_url.format(category=category) + f'?page={page}'
            print(f'Fetching {url}')
            try:
                response = requests.get(url)
                if response.status_code != 200:
                    print(f'Failed to fetch {url}')
                    break
                html_content = response.text
                # Check if there are products on the page
                soup = BeautifulSoup(html_content, 'html.parser')
                product_list = soup.find_all('div', class_='product-item')
                if not product_list:
                    print(f'No products found on page {page} of {category}')
                    break
                all_html += html_content
                page += 1
            except Exception as e:
                print(f'Error fetching {url}: {e}')
                break
        # Save the HTML content to file
        file_name = f'allure_{category}.html'
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(all_html)
        print(f'Saved {file_name}')

# Function to fetch and save HTML pages from HeyGirl.pk
def fetch_heygirl_html_pages():
    categories = {
        'face-care': 'Face Care',
        'sunscreen': 'Sunscreen'
    }

    base_url = 'https://www.heygirl.pk/collections/{category}'

    for category, category_name in categories.items():
        page = 1
        all_html = ''
        print(f"Fetching HeyGirl category: {category_name}")
        while True:
            url = base_url.format(category=category) + f'?page={page}'
            print(f'Fetching {url}')
            try:
                response = requests.get(url)
                if response.status_code != 200:
                    print(f'Failed to fetch {url}')
                    break
                html_content = response.text
                soup = BeautifulSoup(html_content, 'html.parser')
                product_list = soup.find_all('li', class_='grid__item')
                if not product_list:
                    print(f'No products found on page {page} of {category}')
                    break
                all_html += html_content
                page += 1
            except Exception as e:
                print(f'Error fetching {url}: {e}')
                break
        # Save the HTML content to file
        file_name = f'heygirl_{category}.html'
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(all_html)
        print(f'Saved {file_name}')

# Function to fetch and save HTML pages from The Skin Fit (without pagination)
def fetch_skinfit_html_pages():
    categories = {
        'moisturizer': 'Moisturizer',
        'facial-treatments/serums': 'Serum',
        'cleansers': 'Cleanser',
        'face-masks': 'Face Mask',
        'sun-protection/sunscreen': 'Sunscreen'
    }

    base_url = 'https://www.theskinfit.com/skin-care/{category}'

    for category, category_name in categories.items():
        print(f"Fetching The Skin Fit category: {category_name}")
        url = base_url.format(category=category)
        print(f'Fetching {url}')
        try:
            response = requests.get(url)
            if response.status_code != 200:
                print(f'Failed to fetch {url}')
                continue
            html_content = response.text
            # Save the HTML content to file
            file_category = category.replace('/', '-')
            file_name = f'skinfit_{file_category}.html'
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f'Saved {file_name}')
        except Exception as e:
            print(f'Error fetching {url}: {e}')
            continue

# Function to fetch and save HTML pages from SkinStore Pakistan
def fetch_skinstore_html_pages():
    categories = {
        'cleanser': 'Cleanser',
        'masks': 'Face Mask',
        'moisturizer': 'Moisturizer',
        'serums': 'Serum',
        'sunscreen': 'Sunscreen'
    }

    base_url = 'https://skinstorepakistan.com/collections/{category}'

    for category, category_name in categories.items():
        page = 1
        all_html = ''
        print(f"Fetching SkinStore category: {category_name}")
        while True:
            url = base_url.format(category=category) + f'?page={page}'
            print(f'Fetching {url}')
            try:
                response = requests.get(url)
                if response.status_code != 200:
                    print(f'Failed to fetch {url}')
                    break
                html_content = response.text
                soup = BeautifulSoup(html_content, 'html.parser')
                product_list = soup.find_all('div', class_='collection-template__product-item')
                if not product_list:
                    print(f'No products found on page {page} of {category}')
                    break
                all_html += html_content
                page += 1
            except Exception as e:
                print(f'Error fetching {url}: {e}')
                break
        # Save the HTML content to file
        file_name = f'skinstore_{category}.html'
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(all_html)
        print(f'Saved {file_name}')

# Function to fetch and save JSON pages from Vegas.pk
def fetch_vegas_json_pages():
    categories = {
        'Moisturizer': 'Moisturizer',
        'face-masks': 'Face Mask',
        'Cleanser': 'Cleanser',
        'face-serum': 'Serum',
        'Sunscreen': 'Sunscreen'
    }

    base_url = 'https://www.vegas.pk/cl/{category}'

    headers = {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }

    for category, category_name in categories.items():
        page = 1
        all_products = []
        print(f"Fetching Vegas category: {category_name}")
        while True:
            url = base_url.format(category=category) + f'?page={page}'
            print(f'Fetching {url}')
            try:
                response = requests.get(url, headers=headers)
                if response.status_code != 200:
                    print(f'Failed to fetch {url}')
                    break
                data = response.json()
                if 'data' not in data or not data['data']:
                    print(f'No products found on page {page} of {category}')
                    break
                all_products.extend(data['data'])
                if data['next_page_url'] is None:
                    break
                page += 1
            except Exception as e:
                print(f'Error fetching {url}: {e}')
                break
        # Save the JSON data to file
        file_category = category.replace('/', '-').lower()
        file_name = f'vegas_{file_category}.json'
        with open(file_name, 'w', encoding='utf-8') as f:
            json_data = {'products': all_products}
            f.write(str(json_data))
        print(f'Saved {file_name}')

# Function to scrape products from saved HTML files for Allure
def scrape_allure_from_file():
    categories = {
        'cleanser': 'Cleanser',
        'skin-care-mask': 'Face Mask',
        'moisturizer': 'Moisturizer',
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

            product_list = soup.find_all('div', class_='product-item')

            for product in product_list:
                try:
                    name = product['data-title'].strip()
                    product_link = product.find('a', class_='product-item__image-link')['href']
                    brand = product.find('span', class_='product-item__product-vendor').text.strip() if product.find('span', class_='product-item__product-vendor') else 'No brand'
                    price_main = product.find('span', class_='product-item__price-main')
                    regular_price = price_main.find('s').text.strip() if price_main and price_main.find('s') else 'No regular price'
                    sale_price = price_main.find('span', class_='sale').text.strip() if price_main and price_main.find('span', class_='sale') else regular_price
                    image = product.find('img', class_='image__img')['src']
                    discount = product.find('div', class_='product-badge').text.strip() if product.find('div', class_='product-badge') else 'No discount'
                    stock_info = product.find('p', class_='product-item__stock-indicator').text.strip() if product.find('p', class_='product-item__stock-indicator') else 'Unknown stock status'
                    rating = generate_random_rating()

                    products.append({
                        'Name': name,
                        'Brand': brand,
                        'Regular Price': regular_price,
                        'Sale Price': sale_price,
                        'Discount': discount,
                        'Stock Info': stock_info,
                        'Image URL': image,
                        'Product Link': f"https://allurebeauty.pk{product_link}",
                        'Category': category_name,
                        'Rating': rating,
                        'Authenticity': True
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    df = pd.DataFrame(products)
    df.to_csv('allure_products_from_html.csv', index=False)
    print("Data scraped from Allure HTML files.")

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

            product_list = soup.find_all('li', class_='grid__item')

            for product in product_list:
                try:
                    name = product.find('h3', class_='card__heading').text.strip()
                    product_link = product.find('a', class_='full-unstyled-link')['href']
                    image = product.find('img')['src']
                    regular_price = product.find('span', class_='price-item--regular').text.strip() if product.find('span', class_='price-item--regular') else 'No regular price'
                    sale_price = product.find('span', class_='price-item--sale').text.strip() if product.find('span', class_='price-item--sale') else regular_price
                    brand = name.split(' ')[0]
                    stock_status = product.find('span', class_='badge--bottom-left').text.strip() if product.find('span', class_='badge--bottom-left') else 'In stock'
                    rating = generate_random_rating()

                    products.append({
                        'Name': name,
                        'Brand': brand,
                        'Regular Price': regular_price,
                        'Sale Price': sale_price,
                        'Stock Status': stock_status,
                        'Image URL': image,
                        'Product Link': f"https://www.heygirl.pk{product_link}",
                        'Category': category_name,
                        'Rating': rating,
                        'Authenticity': True
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    df = pd.DataFrame(products)
    df.to_csv('heygirl_products_from_html.csv', index=False)
    print("Data scraped from HeyGirl HTML files.")

# Function to scrape products from saved HTML files for The Skin Fit
def scrape_skinfit_from_file():
    categories = {
        'moisturizer': 'Moisturizer',
        'facial-treatments-serums': 'Serum',
        'cleansers': 'Cleanser',
        'face-masks': 'Face Mask',
        'sun-protection-sunscreen': 'Sunscreen'
    }
    products = []

    for category, category_name in categories.items():
        file_category = category.replace('/', '-')
        file_name = f'skinfit_{file_category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='mainbox')

            for product in product_list:
                try:
                    name = product.find('h6', class_='product-title').text.strip()
                    product_link = product.find('a')['href']
                    image = product.find('img')['src']
                    sale_price = product.find('span', class_='new-price').text.strip()
                    regular_price = product.find('span', class_='old-price').text.strip() if product.find('span', class_='old-price') else 'No regular price'
                    discount = product.find('span', class_='sale-badge').text.strip() if product.find('span', class_='sale-badge') else 'No discount'
                    brand = product.find('p', class_='cat-name').text.strip()
                    rating = generate_random_rating()

                    products.append({
                        'Name': name,
                        'Brand': brand,
                        'Regular Price': regular_price,
                        'Sale Price': sale_price,
                        'Discount': discount,
                        'Image URL': image,
                        'Product Link': product_link,
                        'Category': category_name,
                        'Rating': rating,
                        'Authenticity': True
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    df = pd.DataFrame(products)
    df.to_csv('skinfit_products_from_html.csv', index=False)
    print("Data scraped from The Skin Fit HTML files.")

# Function to scrape products from saved HTML files for SkinStore Pakistan
def scrape_skinstore_from_file():
    import re  # Import re for regular expressions
    categories = {
        'cleanser': 'Cleanser',
        'masks': 'Face Mask',
        'moisturizer': 'Moisturizer',
        'serums': 'Serum',
        'sunscreen': 'Sunscreen'
    }
    products = []

    for category, category_name in categories.items():
        file_name = f'skinstore_{category}.html'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        with open(file_name, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            product_list = soup.find_all('div', class_='collection-template__product-item')

            for product in product_list:
                try:
                    # Using the provided product div structure
                    name_tag = product.find('a', class_='product-item__title')
                    name = name_tag.text.strip() if name_tag else 'No name'
                    product_link = name_tag['href'] if name_tag else ''
                    brand_tag = product.find('p', class_='product-single__vendor')
                    brand = brand_tag.text.strip() if brand_tag else 'No brand'
                    price_tag = product.find('div', class_='price')
                    sale_price = price_tag.find('span', class_='price-item--sale').text.strip() if price_tag and price_tag.find('span', class_='price-item--sale') else 'No sale price'
                    regular_price = price_tag.find('s', class_='price-item--regular').text.strip() if price_tag and price_tag.find('s', class_='price-item--regular') else 'No regular price'

                    # Updated code to correctly find and extract the image URL
                    image_tag = product.find('div', class_=lambda x: x and 'product-item__image' in x)
                    image_url = ''
                    if image_tag:
                        if 'style' in image_tag.attrs:
                            image_style = image_tag['style']
                            # Use regular expression to extract URL from style attribute
                            match = re.search(r'background-image:\s*url\((.*?)\);', image_style)
                            if match:
                                image_url = match.group(1).strip('\'"')  # Remove quotes if any
                                # Handle HTML entities
                                image_url = image_url.replace('&quot;', '')
                        # If image_url starts with '//', prepend 'https:'
                        if image_url.startswith('//'):
                            image_url = 'https:' + image_url
                        elif image_url.startswith('/'):
                            image_url = 'https://skinstorepakistan.com' + image_url
                    else:
                        image_url = 'No image URL'

                    discount_tag = product.find('div', class_='product__labels-item')
                    discount = discount_tag.text.strip() if discount_tag else 'No discount'
                    rating = generate_random_rating()

                    products.append({
                        'Name': name,
                        'Brand': brand,
                        'Regular Price': regular_price,
                        'Sale Price': sale_price,
                        'Discount': discount,
                        'Image URL': image_url,
                        'Product Link': f"https://skinstorepakistan.com{product_link}",
                        'Category': category_name,
                        'Rating': rating,
                        'Authenticity': True
                    })
                except Exception as e:
                    print(f"Error scraping product: {e}")

    df = pd.DataFrame(products)
    df.to_csv('skinstore_products_from_html.csv', index=False)
    print("Data scraped from SkinStore HTML files.")


# Function to scrape products from saved HTML files for Vegas.pk
def scrape_vegas_from_file():
    import ast  # Import ast to safely evaluate the string representation of the JSON data
    categories = {
        'moisturizer': 'Moisturizer',
        'face-masks': 'Face Mask',
        'cleanser': 'Cleanser',
        'face-serum': 'Serum',
        'sunscreen': 'Sunscreen'
    }
    products = []

    for category, category_name in categories.items():
        file_category = category.lower()
        file_name = f'vegas_{file_category}.json'
        print(f"Scraping {file_name}...")

        if not os.path.exists(file_name):
            print(f"File {file_name} not found.")
            continue

        try:
            with open(file_name, 'r', encoding='utf-8') as f:
                data_str = f.read()
                json_data = ast.literal_eval(data_str)
                product_list = json_data.get('products', [])
        except Exception as e:
            print(f"Error reading {file_name}: {e}")
            continue

        for product in product_list:
            try:
                name = product.get('title', 'No name')
                brand = product.get('brand', {}).get('title', 'No brand')
                sale_price = product.get('price', 'No sale price')
                regular_price = sale_price  # Assuming regular price is same as sale price unless discount is available
                discount_amount = product.get('discount_amount', 0)
                if discount_amount:
                    regular_price = sale_price + discount_amount
                discount = f"{discount_amount}" if discount_amount else 'No discount'
                product_link = f"https://www.vegas.pk/pd/{product.get('slug', '')}"
                image = f"https://www.vegas.pk/{product.get('thumbnail', {}).get('url', '')}"
                rating = generate_random_rating()
                stock = product.get('online_available_stock', 'Unknown')

                products.append({
                    'Name': name,
                    'Brand': brand,
                    'Regular Price': regular_price,
                    'Sale Price': sale_price,
                    'Discount': discount,
                    'Stock': stock,
                    'Image URL': image,
                    'Product Link': product_link,
                    'Category': category_name,
                    'Rating': rating,
                    'Authenticity': True
                })
            except Exception as e:
                print(f"Error scraping product: {e}")

    df = pd.DataFrame(products)
    df.to_csv('vegas_products_from_html.csv', index=False)
    print("Data scraped from Vegas JSON files.")

# Function to count rows in a CSV file
def count_rows_in_csv(file_name):
    try:
        df = pd.read_csv(file_name)
        return len(df)
    except Exception as e:
        print(f"Error reading {file_name}: {e}")
        return 0

# Function to count rows in all CSVs and compute the total
def count_total_rows():
    csv_files = [
        'allure_products_from_html.csv',
        'heygirl_products_from_html.csv',
        'skinfit_products_from_html.csv',
        'skinstore_products_from_html.csv',
        'vegas_products_from_html.csv'
    ]

    total_rows = 0

    for file_name in csv_files:
        rows = count_rows_in_csv(file_name)
        print(f"{file_name} has {rows} rows.")
        total_rows += rows

    print(f"Total rows across all CSVs: {total_rows}")

# Main function to call all scrapers
def fetch_all_html_pages():
    fetch_allure_html_pages()
    fetch_heygirl_html_pages()
    fetch_skinfit_html_pages()
    fetch_skinstore_html_pages()
    fetch_vegas_json_pages()
    print("Fetching of HTML pages completed!")

def main():
    fetch_all_html_pages()
    scrape_allure_from_file()
    scrape_heygirl_from_file()
    scrape_skinstore_from_file()
    scrape_skinfit_from_file()
    scrape_vegas_from_file()
    print("Scraping completed!")
    count_total_rows()

if __name__ == "__main__":
    main()
