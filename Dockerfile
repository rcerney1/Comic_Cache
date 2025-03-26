FROM python:3.9.18-alpine3.18

# Install build tools and Postgres dependencies
RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

# Set the working directory
WORKDIR /var/www

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy the rest of the application
COPY . .

# Run migrations and seeders at container start, then launch the app
CMD flask db upgrade && flask seed all && gunicorn app:app
