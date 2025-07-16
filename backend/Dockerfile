FROM python:3.13-alpine

WORKDIR /code
COPY requirements.txt .
COPY .env .
RUN pip install -r requirements.txt

ENV PORT=5174

EXPOSE ${PORT}
EXPOSE 5678
COPY . .
CMD uvicorn main:app --host 0.0.0.0 --port $PORT