import pandas as pd

def count_rows(file_paths):
    for file_path in file_paths:
        df = pd.read_csv(file_path)
        print(f"The file {file_path} contains {len(df)} rows.")

if __name__ == "__main__":
    file_paths = [
        'allure_products_from_html_results.csv',
        'heygirl_products_from_html_results.csv',
        'skinfit_products_from_html_results.csv',
        'vegas_products_from_html_results.csv',
        'allure_products_from_html.csv',
        'heygirl_products_from_html.csv',
        'skinfit_products_from_html.csv',
        'vegas_products_from_html.csv',
    ]
    count_rows(file_paths)
