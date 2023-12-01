FROM python:latest

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9

RUN apt-get install git

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN mkdir idea_express

RUN cd ./idea_express

WORKDIR /idea_express

COPY . .


RUN pip install -r ./requirements.txt

RUN pip install uWSGI

EXPOSE 49152


CMD ["uwsgi", "uwsgi.ini" ]