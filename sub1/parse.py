import json
import pandas as pd
import os
import shutil

DATA_DIR = "../data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

store_columns = (
    "id",  # 음식점 고유번호
    "store_name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "area",  # 음식점 위치
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "latitude",  # 음식점 위도
    "longitude",  # 음식점 경도
    "category",  # 음식점 카테고리
)

review_columns = (
    "id",  # 리뷰 고유번호
    "store",  # 음식점 고유번호
    "user",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "reg_time",  # 리뷰 등록 시간
)

##### 사용자 컬럼 생성해줬습니다. 
user_columns= (
    "id", # 사용자 고유번호
    "gender", # 사용자 성별
    "age", # 사용자 나이
)

##### 메뉴 컬럼 생성해줬습니다. 
menu_columns = (
    "store", # 음식점 고유번호
    "menu_name", # 메뉴 이름 
    "price", # 메뉴 가격
)
def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """

    try:
        with open(data_path, encoding="utf-8") as f:
            data = json.loads(f.read())
    except FileNotFoundError as e:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    stores = []  # 음식점 테이블
    reviews = []  # 리뷰 테이블

    # 저장될 유저 및 메뉴 테이블 선언
    users = [] # 유저 테이블 
    menus = [] # 메뉴 테이블 

    for d in data:

        categories = [c["category"] for c in d["category_list"]]
        stores.append(
            [
                d["id"],
                d["name"],
                d["branch"],
                d["area"],
                d["tel"],
                d["address"],
                d["latitude"],
                d["longitude"],
                "|".join(categories),
            ]
        )

        for review in d["review_list"]:
            r = review["review_info"]
            u = review["writer_info"]

            reviews.append(
                [r["id"], d["id"], u["id"], r["score"], r["content"], r["reg_time"]]
            )

        current_year = 2020
        # 리뷰에 글을 단 유저 importing 
        for user in d["review_list"]:
            u = user["writer_info"]

            users.append(
                [u["id"], u["gender"], current_year - int(u["born_year"])]
            )

        # 메뉴 importing 
        for menu in d["menu_list"]:
            m = menu["menu"]
            p = menu["price"]
            menus.append(
                [
                    d["id"], m, p
                ]
            )

    store_frame = pd.DataFrame(data=stores, columns=store_columns)
    review_frame = pd.DataFrame(data=reviews, columns=review_columns)

    # 유저 및 메뉴 프레임 선언
    user_frame = pd.DataFrame(data=users, columns=user_columns)
    menu_frame = pd.DataFrame(data=menus, columns=menu_columns)

    # 리턴값에 유저, 메뉴 배열 추가
    return {"stores": store_frame, "reviews": review_frame, "users":user_frame, "menus":menu_frame}


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes():
    return pd.read_pickle(DUMP_FILE)


def main():

    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print("[음식점]")
    print(f"{separater}\n")
    print(data["stores"]) # data["배열이름"].head() 할 경우 상위 5개만 뽑아와서 일단 전체 출력하도록 했습니다.
    print(f"\n{separater}\n\n")

    print("[리뷰]")
    print(f"{separater}\n")
    print(data["reviews"])
    print(f"\n{separater}\n\n")

    print("[유저]")
    print(f"{separater}\n")
    print(data["users"])
    print(f"\n{separater}\n\n")

    print("[메뉴]")
    print(f"{separater}\n")
    print(data["menus"])
    print(f"\n{separater}\n\n")


if __name__ == "__main__":
    main()