from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import mysql.connector 

import configparser
from retrying import retry

config = configparser.ConfigParser()
config.read('./config.ini')

# @retry(wait_exponential_multiplier=1000, wait_exponential_max=10000, stop_max_attempt_number=5)
table_created = False

def get_database_connection():
    host = config['DEFAULT']['host']
    mysql_database = config['DEFAULT']['MYSQL_DATABASE']
    mysql_user = config['DEFAULT']['MYSQL_USER']
    mysql_password = config['DEFAULT']['MYSQL_PASSWORD']

    conn = mysql.connector.connect(
        host=host,
        user=mysql_user,
        password=mysql_password,
        database=mysql_database,
        port=3306
    )
    cursor = conn.cursor()
    if not table_created:
        conn, cursor = get_database_connection()
        check_table_query = "SHOW TABLES LIKE 'sample_employee'"
        cursor.execute(check_table_query)
        result = cursor.fetchone()
        if not result:
            create_table_query = """
            CREATE TABLE sample_employee (
                employee_id INT AUTO_INCREMENT PRIMARY KEY,
                employee_name VARCHAR(255),
                department VARCHAR(255),
                job_title VARCHAR(255),
                email_address VARCHAR(255),
                phone_number VARCHAR(20),
                address TEXT
            )
            """
            cursor.execute(create_table_query)
            conn.commit()
            cursor.close()
            conn.close()
            table_created = True
    return conn, cursor



@app.route("/")
def Home():

    return "Hello welocome to my world"


@app.route("/new")
def new():

    return "new message hello  welcome to hyderabad"

@app.route("/api/add_data", methods=["POST"])
def add_data():
    try:
        fetch_data = request.json
        insert_data_query = """
        INSERT INTO sample_employee (employee_name, department, job_title, email_address, phone_number, address)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        employee_data = (fetch_data.get("employee_name"), fetch_data.get("department"), fetch_data.get("job_title"),
                         fetch_data.get("email_address"), fetch_data.get("phone_number"), fetch_data.get("address"))

        # Establish a new connection and cursor for this request
        conn, cursor = get_database_connection()
        
        # Execute the SQL query to insert data
        cursor.execute(insert_data_query, employee_data)

        # Commit the changes to the database
        conn.commit()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        return jsonify({"message": "Data added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/view_data")
def view_data():
    conn, cursor = get_database_connection()
    fetch_all_data=f"Select * from sample_employee"
    cursor.execute(fetch_all_data)
    enite_data=cursor.fetchall()
    print(enite_data)
    cursor.close()
    conn.close()   
     
    return jsonify(enite_data)



@app.route("/api/submit_data", methods=["PUT"])
def submit_data():
    submitted_data = request.get_json()  # Get the JSON data from the request body
    print(submitted_data)  # Handle the updated data as needed

    # Assuming submitted_data is a dictionary containing the updated values
    employee_id = submitted_data[0]
    employee_name = submitted_data[1]
    department = submitted_data[2]
    job_title = submitted_data[3]
    email_address = submitted_data[4]
    phone_number = submitted_data[5]
    address = submitted_data[6]
    print(employee_id)

    conn, cursor = get_database_connection()

    # Update the database with the new values
    # Example query for updating data in SQLite

    update_query = f"""
UPDATE sample_employee
SET employee_name='{employee_name}', department='{department}', job_title='{job_title}',
email_address='{email_address}', phone_number='{phone_number}', address='{address}'
WHERE employee_id={employee_id}
"""
    
    cursor.execute(update_query)
    conn.commit()

    # Fetch the updated data from the database
    fetch_updated_data_query = f'SELECT * FROM sample_employee'
    cursor.execute(fetch_updated_data_query)
    updated_data = cursor.fetchall()
    print(updated_data)
    cursor.close()
    conn.close()
    return jsonify(updated_data)



@app.route("/api/delete_data",methods=["DELETE"])
def delete_data():
    delete_data=request.get_json()
    employee_id = delete_data[0]
    query_data=f"Delete from sample_employee where employee_id={employee_id}"
    conn,cursor=get_database_connection()
    cursor.execute(query_data)
    conn.commit()
    select_data=f"select * from sample_employee"
    cursor.execute(select_data)
    data=cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5003, debug=True)


