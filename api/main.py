from fastapi import FastAPI
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()
DB_PW = os.getenv('DB_PW')

app = FastAPI()

@app.post('/add-fach/{fach_name}')
def insert_fach(fach_name: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'INSERT INTO fach (fach) VALUES (%s)'
    val = (fach_name,)
    mycursor.execute(sql, val)
    mydb.commit()
    mycursor.close()
    mydb.close()
    return {"message": f"Fach '{fach_name}' added successfully"}

@app.post('/delete-fach/{fach_name}')
def delete_fach(fach_name: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'DELETE FROM fach WHERE fach = %s'
    val = (fach_name,)
    mycursor.execute(sql, val)
    mydb.commit()
    mycursor.close()
    mydb.close()
    return {"message": f"Fach '{fach_name}' deleted successfully"}

def list_fach():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT * FROM fach'
    mycursor.execute(sql)
    result = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return result

if __name__ == '__main__':
    list_fach()