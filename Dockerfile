FROM python:latest

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools


WORKDIR /idea_express

COPY . .


RUN pip install -r ./requirements.txt

EXPOSE 8000


CMD ["python", "./backend/main.py" ]