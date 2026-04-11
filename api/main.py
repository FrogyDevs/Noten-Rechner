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
#Fach related APIs
#adds a fach to the current semester
@app.post('/add-fach/{semesterID}/{fach_name}')
def insert_fach(semesterID: int, fach_name: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'INSERT INTO fach (Fach, SemesterID) VALUES (%s, %s)'
    val = (fach_name, semesterID)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except:
        mydb.rollback()
    mycursor.close()
    mydb.close()
    return {"message": f"Fach '{fach_name}' added successfully"}

#deletes a fach from the current semester
@app.post('/delete-fach/{semesterID}/{fach_name}') #TODO: Change to fach_id
def delete_fach(semesterID: int, fach_name: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'DELETE FROM fach WHERE fach.SemesterID = %s and fach.fach = %s'
    val = (semesterID, fach_name)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except:
        mydb.rollback()
        return {"message": f"Fach '{fach_name}' could not be deleted"}
    mycursor.close()
    mydb.close()
    return {"message": f"Fach '{fach_name}' deleted successfully"}

#lists all fachs of the current semester
@app.get('/list-fach')
def list_fach():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT fach.Fach FROM fach where fach.SemesterID = (select SemesterID from semester where currentSemester=true)'
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

@app.post('/set-fach/{semesterID}')
def set_fach(semesterID: int):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'call updateCurrentFach(%s)'
    val = (semesterID,)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception as e:
        mydb.rollback()
        return {"message": f"Fach '{semesterID}' could not be set. {e}"}
    mycursor.close()
    mydb.close()
    return {"message": f"Fach '{semesterID}' set successfully"}

@app.get('/get-currentfach')
def get_currentfach():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = ('SELECT Fach.FachID FROM Fach where Fach.currentFach=true')
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

#Semester related APIs
#lists all semesters
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

#sets the current semester
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
    val = (semester_id,)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception as e:
        mydb.rollback()
        return {"message": f"Semester '{semester_id}' could not be set. {e}"}
    mycursor.close()
    mydb.close()
    return {"message": f"Semester '{semester_id}' set successfully"}

#gets the current semester
@app.get('/get-Currentsemester')
def get_Currentsemester():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT SemesterID, Semester FROM semester where currentSemester=true'
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

#adds a semester
@app.post('/add-semester/{semester}')
def add_semester(semester: str):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'INSERT INTO semester (Semester) VALUES (%s)'
    val = (semester,)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except:
        mydb.rollback()
    mycursor.close()
    mydb.close()
    return {"message": f"Semester '{semester}' added successfully"}

@app.post('/delete-semester/{semester_name}')
def delete_semester(semester_name: str): #TODO: Change to semester_id
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'DELETE FROM semester WHERE semester.Semester = %s'
    val = (semester_name,)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except:
        mydb.rollback()
        return {"message": f"Semester '{semester_name}' could not be deleted"}
    mycursor.close()
    mydb.close()
    return {"message": f"Semester '{semester_name}' deleted successfully"}

# API's for the marks
@app.get('/get-marks')
def get_marks():
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'SELECT NotenID, exam, Note FROM Note where Note.FachID = (select FachID from Fach where currentFach = true)'
    mycursor.execute(sql)
    data = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return data

@app.post('/add-marks/{fach_id}/{exam}/{note}')
def add_marks(fach_id: int, exam: str, note: int):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        password=DB_PW,
        database='notenrechnerdb'
    )
    mycursor = mydb.cursor()
    sql = 'call updateNote(%s, %s, %s)'
    val = (fach_id, exam, note)
    try:
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception as e:
        mydb.rollback()
        return {"message": f"Note for '{exam}' could not be set. {e}"}
    mycursor.close()
    mydb.close()
    return {"message": f"Note for '{exam}' set successfully"}

if __name__ == '__main__':
    print(get_currentfach())