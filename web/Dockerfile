FROM python:2.7
MAINTAINER Amanda Hoelting "ahoeltin@uoregon.edu"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]

# Docker's network is 172.17.0.2:<port number>