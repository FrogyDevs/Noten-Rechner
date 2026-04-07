from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()
DB_PW = os.getenv('DB_PW')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/add-fach/{fach_name}')
def insert_fach(fach_name: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'INSERT INTO fach (SemesterID,Fach) VALUES (%s)'
    val = (fach_name)
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

@app.get('/list-fach')
def list_fach():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT Fach FROM fach'
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

@app.get('/list-semester')
def list_semester():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT SemesterID, Semester FROM semester'
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

@app.post('/set-semester/{semester_id}')
def set_semester(semester_id: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'call updateCurrentSemester(%s)'
    val = (semester_id)
    mycursor.execute(sql, val)
    mydb.commit()
    mycursor.close()
    mydb.close()
    return {"message": f"Semester '{semester_id}' set successfully"}

if __name__ == '__main__':
    print(list_fach())