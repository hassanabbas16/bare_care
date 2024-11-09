import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from transformers import BertTokenizer, BertModel
import torch
import numpy as np


def load_data(filepath):
    return pd.read_csv(filepath)


def preprocess_data(df):
    # Combine text fields
    df['combined_text'] = df['ProductName/Description'] + " " + df['Brand'] + " " + df['Category']

    # Clean and convert price and discount fields
    df['New Price'] = df['New Price'].replace(r'[Rs.,]', '', regex=True).astype(float)
    df['Old Price'] = df['Old Price'].replace(r'[Rs.,]', '', regex=True).astype(float)
    df['Discount'] = df['Discount'].str.rstrip('%').astype(float) / 100.0  # Convert percentages to float

    # Handle NaNs for numeric columns only
    numeric_columns = ['New Price', 'Old Price', 'Discount', 'Rating']
    df[numeric_columns] = df[numeric_columns].apply(pd.to_numeric, errors='coerce')
    df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

    return df


def generate_embeddings(df):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    tokens = tokenizer(df['combined_text'].tolist(), padding=True, truncation=True, return_tensors="pt", max_length=512)

    with torch.no_grad():
        outputs = model(**tokens)
        embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return embeddings


def normalize_features(df):
    scaler = MinMaxScaler()
    numerical_features = scaler.fit_transform(df[['New Price', 'Old Price', 'Discount', 'Rating']])
    return numerical_features


def save_features(embeddings, numerical_features, labels, filename='features.npy'):
    features = np.concatenate([embeddings, numerical_features], axis=1)
    np.savez(filename, features=features, labels=labels)


if __name__ == "__main__":
    df = load_data('synthetic_skincare_products.csv')
    df = preprocess_data(df)
    embeddings = generate_embeddings(df)
    numerical_features = normalize_features(df)
    save_features(embeddings, numerical_features, df['Authenticity'].values)
