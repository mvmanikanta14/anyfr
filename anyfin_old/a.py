import psycopg2

DB_CONFIG = {
    "host": "postgre-test-server.crccd5mpnjb5.ap-south-1.rds.amazonaws.com",
    "user": "root",
    "password": "BbnumiocNPwxOtznM0q6",
    "database": "anyfin_pg",
    "port": 5432  # Ensure port is specified
}
try:
    conn = psycopg2.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        port=DB_CONFIG["port"],
 # Helps avoid hanging connections
    )
    print("Connected successfully!")
    conn.close()
except Exception as e:
    print("Error:", e)
