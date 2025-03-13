FROM python:3.9.12
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./api /app/api
CMD ["fastapi", "run", "api/main.py", "--port", "8080"]
