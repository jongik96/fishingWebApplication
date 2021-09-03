from operator import le
from parse import load_dataframes
import pandas as pd
import shutil
from scipy import sparse


def users_stores_matrix(dataframes):
    reviews_group = dataframes["reviews"]
    data = []
    row_pos, col_pos = [], []
    for i, review in reviews_group.iterrows():
        row_pos.append(review["user"])
        col_pos.append(review["store"])
        data.append(review["score"])

    csr_mat = sparse.coo_matrix((data, (row_pos, col_pos)))
    return csr_mat


def users_categories_matrix(dataframes):
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    data = []
    row_pos, col_pos = [], []
    categories = dict()
    index = 0
    for i, review in stores_reviews.iterrows():
        row_pos.append(review["user"])
        if review["category"] not in categories:
            categories[review["category"]] =  index
            index += 1
        col_pos.append(categories[review["category"]])
        data.append(review["score"])

    csr_mat = sparse.coo_matrix((data, (row_pos, col_pos)))
    return csr_mat


def main():
    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    stores_scores_matrix = users_stores_matrix(data)
    categories_scores_matrix = users_categories_matrix(data)

    print("[유저-음식점 행렬]")
    print(f"{separater}\n")
    print(stores_scores_matrix)
    print(f"\n{separater}\n\n")

    print("[유저-카테고리 행렬]")
    print(f"{separater}\n")
    print(categories_scores_matrix)
    print(f"\n{separater}\n\n")

if __name__ == "__main__":
    main()
