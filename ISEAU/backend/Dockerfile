FROM python:3

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /backend
WORKDIR /backend
COPY . /backend

CMD ["python3", "manage.py", "migrate"]
ENTRYPOINT ["python3", "manage.py", "loaddata", "user/fixtures/Userdata.json"]
ENTRYPOINT ["python3", "manage.py", "loaddata", "fishing/fixtures/fishing.json"]
ENTRYPOINT ["python3", "manage.py", "loaddata", "fishing/fixtures/reviewdata.json"]
CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000
