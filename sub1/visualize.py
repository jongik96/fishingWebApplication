import itertools
from collections import Counter
from parse import load_dataframes
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm


def set_config():
    # 폰트, 그래프 색상 설정
    font_list = fm.findSystemFonts(fontpaths=None, fontext="ttf")
    if any(["notosanscjk-black" in font.lower() for font in font_list]):
        plt.rcParams["font.family"] = "Noto Sans CJK JP"
    else:
        if not any(["malgun" in font.lower() for font in font_list]):
            raise Exception(
                "Font missing, please install Noto Sans CJK or Malgun Gothic. If you're using ubuntu, try `sudo apt install fonts-noto-cjk`"
            )

        plt.rcParams["font.family"] = "Malgun Gothic"

    sns.set_palette(sns.color_palette("Spectral"))
    plt.rc("xtick", labelsize=6)


def show_store_categories_graph(dataframes, n=100):
    """
    Tutorial: 전체 음식점의 상위 `n`개 카테고리 분포를 그래프로 나타냅니다.
    """

    stores = dataframes["stores"]
    # 모든 카테고리를 1차원 리스트에 저장합니다
    categories = stores.category.apply(lambda c: c.split("|"))
    categories = itertools.chain.from_iterable(categories)

    # 카테고리가 없는 경우 / 상위 카테고리를 추출합니다
    categories = filter(lambda c: c != "", categories)
    categories_count = Counter(list(categories))
    # print(categories_count)
    best_categories = categories_count.most_common(n=n)

    df = pd.DataFrame(best_categories, columns=["category", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="category", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 카테고리 분포")
    # plt.show()


def show_store_review_distribution_graph(dataframes):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    review_group = stores_reviews.groupby(["store"])
    reviews = review_group.count()
    reviews = reviews.sort_values(by="content", ascending=False)
    review_list = []
    for i, r in reviews.iterrows():
        review_list.append(r["content"])

    reviews_count = Counter(review_list)
    print(reviews_count)
    best_reviews = reviews_count.most_common()
    df = pd.DataFrame(best_reviews, columns=["reviews", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="reviews", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 리뷰 분포")
    plt.show()

    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    review_group = stores_reviews.groupby(["store"])
    reviews = review_group.count()
    reviews = reviews.sort_values(by="score", ascending=False)

    review_list = []
    for i, r in reviews.iterrows():
        review_list.append(r["score"])

    reviews_count = Counter(review_list).most_common()

    df = pd.DataFrame(reviews_count, columns=["reviews", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="reviews", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 리뷰 분포")
    plt.show()

def show_store_average_ratings_graph(dataframes):
    """
    Req. 1-3-2 각 음식점의 평균 평점 분포를 그래프로 나타냅니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    scores_group = stores_reviews.groupby(["store", "store_name"])
    scores = scores_group.mean()
    score_list = []
    for i, r in scores.iterrows():
        score_list.append(round(r["score"], 1))

    scores_count = Counter(score_list)
    best_scores = scores_count.most_common()
    df = pd.DataFrame(best_scores, columns=["scores", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="scores", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 평균 평점 분포")
    plt.show()

    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    scores_group = stores_reviews.groupby(["store", "store_name"]).mean()

    avg_scores = []
    for i, s in scores_group.iterrows():
        avg_scores.append(round(s["score"], 1))

    scores_count = Counter(avg_scores).most_common()

    df = pd.DataFrame(scores_count, columns=["store_name", "avg_score"])

    # 그래프로 나타냅니다
    chart = sns.barplot(x="store_name", y="avg_score", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점의 평균 평점")
    plt.show()

  
def show_user_review_distribution_graph(dataframes):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """
    reviews_group = dataframes["reviews"].groupby("user").count()

    reviews_count = []
    for i, r in reviews_group.iterrows():
        reviews_count.append(r["score"])

    reviews_count = Counter(reviews_count).most_common()
    df = pd.DataFrame(reviews_count, columns=["reviews", "count"]).sort_values(by=["reviews"], ascending=True)

     # 그래프로 나타냅니다
    chart = sns.barplot(x="reviews", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("유저 리뷰 개수 분포")
    plt.show()


def show_user_age_gender_distribution_graph(dataframes):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    users = dataframes["users"]
    users["age"] = users["age"] // 10 * 10
    man_list, woman_list = [], []
    for i, u in users.iterrows():
        if u["gender"] == '남':
            man_list.append(u["age"])
        else:
            woman_list.append(u["age"])

    man_count = Counter(man_list)
    woman_count = Counter(woman_list)
    
    plt.plot([v for v in range(0, 110, 10)], [man_count[v] for v in range(0, 110, 10)], marker="o", label="남성")
    plt.plot([v for v in range(0, 110, 10)], [woman_count[v] for v in range(0, 110, 10)], marker="o", label="여성")
    plt.legend(loc=(0.8, 0.8))
    plt.xlabel('Age')
    plt.ylabel('Count')
    plt.title("유저 성별 / 나이대 분포")
    plt.show()


def show_stores_distribution_graph(dataframes):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    stores = dataframes["stores"]
    jeju = []
    for i, store in stores.iterrows():
        try:
            if 32 < float(store["latitude"]) < 33.6 and 126 < float(store["longitude"]) < 127:
                jeju.append(store["store_name"])
        except:
            continue
    
    print("[제주에 있는 식당]")
    for j in jeju:
        print("제주에 있는 {store} 가게".format(store = j))



def main():
    set_config()
    data = load_dataframes()
    # show_store_categories_graph(data)
    # show_store_review_distribution_graph(data)
    # show_store_average_ratings_graph(data)
    # show_user_review_distribution_graph(data)
    show_user_age_gender_distribution_graph(data)
    # show_stores_distribution_graph(data)

if __name__ == "__main__":
    main()