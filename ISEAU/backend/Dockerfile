FROM python:3

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /backend
WORKDIR /backend
COPY . /backend

# CMD ["python3", "manage.py", "runserver", "0:8000"]
CMD ["ls" ]
EXPOSE 8000
