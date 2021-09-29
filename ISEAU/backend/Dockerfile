FROM python:3

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# RUN mkdir /backend
WORKDIR .
# COPY ./backend /backend

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000
