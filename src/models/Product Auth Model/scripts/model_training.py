import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib  # For saving the model

def load_features(filename='features.npy.npz'):
    data = np.load(filename)
    features = data['features']
    labels = data['labels']
    return features, labels

def train_model(features, labels):
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)
    return model, model.score(X_test, y_test)

def save_model(model, filename='bert_authenticity_model.pkl'):
    joblib.dump(model, filename)

if __name__ == "__main__":
    features, labels = load_features()
    model, accuracy = train_model(features, labels)
    print(f'Model trained with accuracy: {accuracy * 100:.2f}%')
    save_model(model)
