
# trying a fix
FROM python:2.7  
#Stick to Python 2.7
MAINTAINER Amanda Hoelting "ahoeltin@uoregon.edu"

WORKDIR /app
     # Set the working directory to /app

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt-get clean 
     # Clean up to reduce image size


COPY requirements.txt ./
RUN pip install -r requirements.txt  
# Install dependencies first

COPY . .
# Copy the rest of the application code

# ENTRYPOINT ["python"]
CMD ["python", "app.py"]