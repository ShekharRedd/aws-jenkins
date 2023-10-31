# FROM ubuntu

# RUN apt-get update && apt-get install -y python3 python3-pip

# COPY ./config.ini /

# COPY ./requirements.txt /
# COPY ./ram.py /

# WORKDIR /
# RUN pip install -r requirements.txt
# # install app

# ENV FLASK_APP=ram
# EXPOSE 8000
# CMD flask run --host 0.0.0.0 --port 8000

# final configuration
# ENV FLASK_APP=ram
# EXPOSE 8000
# CMD flask run --host 0.0.0.0 --port 8000


FROM python:latest

RUN mkdir /home/python 

COPY ./run.py /home/python/

COPY ./requirements.txt /home/python/
COPY ./config.ini /home/python/

# RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
#     && rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /home/python/

RUN  pip install -r requirements.txt

CMD [ "python","run.py" ]

# CMD ["dockerize", "-wait", "tcp://react_application_api-mysqlhost-1:3306", "-timeout", "60s", "python", "sam.py"]
