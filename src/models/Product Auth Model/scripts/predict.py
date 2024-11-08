import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from transformers import BertTokenizer, BertModel
import torch
import joblib

# Load data
def load_data(filepath):
    return pd.read_csv(filepath)

# Preprocess data
def preprocess_data(df):
    # Handle possible column naming discrepancies
    column_mapping = {
        'Regular Price': 'Old Price',
        'Sale Price': 'New Price',
        'Name': 'ProductName/Description'
    }
    df.rename(columns=column_mapping, inplace=True)

    # Set default values for missing essential columns
    essential_columns = ['ProductName/Description', 'Brand', 'Category', 'New Price', 'Old Price', 'Discount', 'Rating']
    defaults = {
        'ProductName/Description': "Unknown Product",
        'Brand': "Unknown Brand",
        'Category': "Unknown Category",
        'New Price': "Rs.0",
        'Old Price': "Rs.0",
        'Discount': "0%",
        'Rating': df['Rating'].mean() if 'Rating' in df.columns else 0
    }
    for column in essential_columns:
        if column not in df.columns:
            df[column] = defaults[column]

    # Convert price formats and calculate discount if necessary
    df['New Price'] = pd.to_numeric(df['New Price'].replace(r'[Rs.,]', '', regex=True), errors='coerce').fillna(0)
    df['Old Price'] = pd.to_numeric(df['Old Price'].replace(r'[Rs.,]', '', regex=True), errors='coerce').fillna(0)
    if 'Discount' in df.columns and df['Discount'].dtype == object:
        df['Discount'] = pd.to_numeric(df['Discount'].str.rstrip('%'), errors='coerce').fillna(0) / 100.0
    else:
        df['Discount'] = ((df['Old Price'] - df['New Price']) / df['Old Price']).fillna(0)

    # Combine text fields for BERT processing
    df['combined_text'] = df['ProductName/Description'].astype(str) + " " + df['Brand'].astype(str) + " " + df['Category'].astype(str)
    # No return statement needed as df is modified in-place

# Generate embeddings
def generate_embeddings(df):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    tokens = tokenizer(df['combined_text'].tolist(), padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():
        outputs = model(**tokens)
        embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return embeddings

# Normalize features
def normalize_features(df):
    scaler = MinMaxScaler()
    numerical_features = scaler.fit_transform(df[['New Price', 'Old Price', 'Discount', 'Rating']])
    return numerical_features

# Load model
def load_model(filename='bert_authenticity_model.pkl'):
    return joblib.load(filename)

# Make predictions
def make_prediction(model, features):
    return model.predict(features)

# Main function to process files and predict authenticity
def process_and_predict(filepaths, model_filename):
    for filepath in filepaths:
        df_original = load_data(filepath)  # Load original data
        df_processed = df_original.copy()  # Copy for processing
        preprocess_data(df_processed)  # Preprocess data
        embeddings = generate_embeddings(df_processed)
        numerical_features = normalize_features(df_processed)
        features = np.concatenate([embeddings, numerical_features], axis=1)

        model = load_model(model_filename)
        predictions = make_prediction(model, features)

        # Add predictions to the original DataFrame
        df_original['Authenticity'] = predictions

        # Save the original DataFrame with the 'Authenticity' column added
        output_filename = filepath.split('/')[-1].replace('.csv', '_results.csv')
        df_original.to_csv(output_filename, index=False)
        print(f"Processed {filepath} and predictions saved: {output_filename}")

if __name__ == "__main__":
    file_list = ['allure_products_from_html.csv', 'heygirl_products_from_html.csv', 'skinfit_products_from_html.csv', 'vegas_products_from_html.csv']
    process_and_predict(file_list, '../bert_authenticity_model.pkl')
