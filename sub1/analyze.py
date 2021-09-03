from parse import load_dataframes
import pandas as pd
import shutil


def sort_stores_by_score(dataframes, n=20, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    # 왼쪽 id, 오른쪽 store 기준으로 공통 된 것 merge
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    # 가게 id, 가게 이름으로 그룹화
    scores_group = stores_reviews.groupby(["store", "store_name"])
    scores_group = scores_group.filter(lambda r: len(r) >= min_reviews).groupby(["store", "store_name"])
    scores = scores_group.mean()
    scores = scores.sort_values(by="score", ascending=False)

    return scores.head(n=n).reset_index()


def get_most_reviewed_stores(dataframes, n=20):
    """
    Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    scores_group = stores_reviews.groupby(["store", "store_name"])
    scores = scores_group.count()
    scores = scores.sort_values(by="content", ascending=False)

    return scores.head(n=n).reset_index()


def get_most_active_users(dataframes, n=20):
    """
    Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.
    """
    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], on="id"
    )
    count = [0] * len(users_reviews)
    users_reviews["count"] = count
    users_group = users_reviews.groupby("id")
    users_group = users_group.count().sort_values(by="content", ascending=False)
    return users_group.head(n=n).reset_index()


def main():
    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    stores_most_scored = sort_stores_by_score(data)
    stores_most_reviewed = get_most_reviewed_stores(data)
    users_most_reviewed = get_most_active_users(data)

    print("[최고 평점 음식점]")
    print(f"{separater}\n")
    for i, store in stores_most_scored.iterrows():
        print(
            "{rank}위: {store}({score:.4f}점)".format(
                rank=i + 1, store=store.store_name, score=store.score
            )
        )
    print(f"\n{separater}\n\n")

    print("[최다 리뷰 음식점]")
    print(f"{separater}\n")
    for i, store in stores_most_reviewed.iterrows():
        print(
            "{rank}위: {store} (리뷰 : {review}개)".format(
                rank=i + 1, store=store.store_name, review=store.content
            )
        )
    print(f"\n{separater}\n\n")

    print("[최다 리뷰 유저]")
    print(f"{separater}\n")
    for i, user in users_most_reviewed.iterrows():
        print(
            "{rank}위: {id} (리뷰 : {review}개)".format(
                rank=i + 1, id=user.id, review=user.content
            )
        )
    print(f"\n{separater}\n\n")

    most_reviewed_stores = get_most_reviewed_stores(data)

    print("[리뷰 개수 기준 음식점]")
    print(f"{separater}\n")
    for i, store in most_reviewed_stores.iterrows():
        print(
            "{rank}위: {store}(리뷰 {score}개)".format(
                rank=i + 1, store=store.store_name, score=store.score
            )
        )
    print(f"\n{separater}\n\n")

    most_active_users = get_most_active_users(data)

    print("[리뷰 개수 기준 유저]")
    print(f"{separater}\n")
    for i, store in most_active_users.iterrows():
        print(
            "{rank}위: {user}(리뷰 {score}개)".format(
                rank=i + 1, score=store.score, user=store.user
            )
        )
    print(f"\n{separater}\n\n")

if __name__ == "__main__":
    main()
