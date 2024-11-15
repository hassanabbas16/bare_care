import pandas as pd
import numpy as np
from supabase import create_client, Client

# Function to load data and standardize columns
def load_and_prepare_data(file_path, vendor_name):
    df = pd.read_csv(file_path)

    # Standardize column names and handle missing columns
    column_map = {
        'Name': 'product_name',
        'ProductName/Description': 'product_name',
        'Brand': 'brand',
        'Regular Price': 'regular_price',
        'Old Price': 'regular_price',
        'Sale Price': 'sale_price',
        'New Price': 'sale_price',
        'Discount': 'discount',
        'Stock Info': 'stock_info',
        'Stock Status': 'stock_info',
        'Stock': 'stock_info',
        'Image URL': 'image_url',
        'Product Link': 'product_link',
        'Category': 'category',
        'Rating': 'rating',
        'Authenticity': 'authenticity'
    }
    df.rename(columns=column_map, inplace=True)

    # Ensure all required columns are present
    required_columns = [
        'product_name', 'brand', 'regular_price', 'sale_price',
        'discount', 'stock_info', 'image_url', 'product_link',
        'category', 'rating', 'authenticity'
    ]
    for col in required_columns:
        if col not in df.columns:
            df[col] = None  # Fill missing columns with None

    # Add 'vendor_name' to DataFrame
    df['vendor_name'] = vendor_name

    # Normalize URLs (add 'https://' if missing)
    def normalize_url(url):
        if pd.isnull(url):
            return None
        if not url.startswith('http'):
            return 'https:' + url
        return url

    df['image_url'] = df['image_url'].apply(normalize_url)
    df['product_link'] = df['product_link'].apply(normalize_url)

    # Normalize 'category' values
    category_map = {
        'Cleanser': 'Cleanser',
        'Face Mask': 'Face Mask',
        'Moisturizer': 'Moisturizer',
        'Sunscreen': 'Sunscreen',
        'Serum': 'Serum',
        'Face Care': 'Face Care',
        # Add any other necessary mappings
    }
    df['category'] = df['category'].map(category_map).fillna(df['category'])

    # Clean and standardize price and discount fields
    def clean_price(price):
        if pd.isnull(price):
            return None
        price = str(price)
        price = price.replace('Rs.', '').replace('Rs', '').replace('$', '')
        price = price.replace(',', '').replace(' ', '').strip()
        if price == '':
            return None
        # Remove any decimal points
        price = price.split('.')[0]
        return price

    df['regular_price'] = df['regular_price'].apply(clean_price)
    df['sale_price'] = df['sale_price'].apply(clean_price)

    # Normalize 'discount' field
    def clean_discount(discount):
        if pd.isnull(discount):
            return None
        discount = str(discount).lower()
        if 'no discount' in discount or discount.strip() == '':
            return None
        # Extract numeric value
        discount_value = ''.join(filter(str.isdigit, discount))
        if discount_value == '':
            return None
        return f"{discount_value}% off"

    df['discount'] = df['discount'].apply(clean_discount)

    # Convert 'rating' to float
    df['rating'] = pd.to_numeric(df['rating'], errors='coerce')

    # Convert 'authenticity' column to boolean
    df['authenticity'] = df['authenticity'].astype(bool)

    # Ensure all columns in the products table are present, fill missing with None
    products_table_columns = [
        'product_name', 'brand', 'category', 'regular_price', 'sale_price',
        'discount', 'rating', 'stock_info', 'image_url', 'product_link',
        'vendor_name', 'authenticity', 'skin_type', 'concern', 'price_range',
        'fragrance_free', 'organic_level', 'application_time', 'allergen_free',
        'sensitivity_level', 'age_range'
    ]
    for col in products_table_columns:
        if col not in df.columns:
            df[col] = None

    # Replace NaN with None
    df = df.replace({np.nan: None})

    # Print columns and first few rows for debugging
    print(f"Processed DataFrame for {vendor_name}:")
    print(df.head())

    return df[products_table_columns]

# Upload data to Supabase
def upload_data_to_supabase(df, supabase: Client):
    # Convert DataFrame to list of dictionaries
    data = df.to_dict(orient='records')

    # Upload data to Supabase
    try:
        response = supabase.table('products').insert(data).execute()
        if response.error:
            print(f"Failed to upload data: {response.error}")
        else:
            print(f"Data uploaded successfully.")
    except Exception as e:
        print(f"Failed to upload data: {e}")

def main():
    # Supabase setup
    url = "https://yshmrmdhxmzjztqbjtbd.supabase.co"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaG1ybWRoeG16anp0cWJqdGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4NzI2OTYsImV4cCI6MjA0MzQ0ODY5Nn0.8dTl7N74b5T2pQKXB0-iLVOqKQJiQK-TlEFlmhDN96E"
    supabase: Client = create_client(url, key)

    # File paths and vendor names
    files_info = [
        ('allure_products_from_html.csv', 'Allure'),
        ('heygirl_products_from_html.csv', 'HeyGirl'),
        ('skinfit_products_from_html.csv', 'SkinFit'),
        ('skinstore_products_from_html.csv', 'SkinStore'),
        ('vegas_products_from_html.csv', 'Vegas')
    ]

    # Process and upload data for each file
    for file_path, vendor_name in files_info:
        df = load_and_prepare_data(file_path, vendor_name)
        upload_data_to_supabase(df, supabase)

if __name__ == "__main__":
    main()
