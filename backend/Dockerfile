FROM python:3.13-alpine
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN apk add --no-cache sqlite
COPY . .
RUN sqlite3 db.sqlite3 < init.sql
CMD ["python", "main.py"]
EXPOSE 5174