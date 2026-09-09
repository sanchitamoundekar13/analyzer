# Multi-stage lightweight Python 3.11 Production Container for KisanSetu
FROM python:3.11-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim as runner

# Create non-root secure system user for GovTech compliance
RUN groupadd -g 10001 kisansetu && \
    useradd -u 10000 -g kisansetu -s /bin/sh kisansetu

WORKDIR /app
COPY --from=builder /root/.local /home/kisansetu/.local
COPY . /app

ENV PATH=/home/kisansetu/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000 \
    HOST=0.0.0.0

RUN chown -R kisansetu:kisansetu /app /home/kisansetu
USER kisansetu

EXPOSE 8000

# High-concurrency production ASGI runner with 4 worker processes
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--proxy-headers", "--forwarded-allow-ips", "*"]
