from flask import Blueprint, request, Response
from flaskext.mysql import MySQL
import json
import datetime

db = MySQL()

backend_api = Blueprint('backend_api', __name__)

USERNAME = 'georgep'

# screen13
@backend_api.route('/approveUser')
def approve_user():
    username = request.args.get('username')
    if username is None:
        return Response(status=500)
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_approve_user', [username])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return Response(status=200)

# screen13
@backend_api.route('/declineUser')
def decline_user():
    username = request.args.get('username')
    if username is None:
        return Response(status=500)
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_decline_user', [username])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return Response(status=200)

# screen13
@backend_api.route('/filterUser')
def filter_user():
    username = request.args.get('username')
    status = request.args.get('status')
    sortBy = request.args.get('sortBy')
    sortDirection = request.args.get('sortDirection')

    if username is None:
        username = ''
    if status is None or status == '':
        status = 'ALL'
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_filter_user', [username, status, sortBy, sortDirection])
        cur.execute('''SELECT * FROM AdFilterUser''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:

            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen14
@backend_api.route('/filterCompany')
def filter_company():
    comName = request.args.get('comName')
    minCity = request.args.get('minCity')
    maxCity = request.args.get('maxCity')
    minTheater = request.args.get('minTheater')
    maxTheater = request.args.get('maxTheater')
    minEmployee = request.args.get('minEmployee')
    maxEmployee = request.args.get('maxEmployee')
    sortBy = request.args.get('sortBy')
    sortDirection = request.args.get('sortDirection')

    if comName is None or comName == "":
        comName = 'all'
    if minCity == "":
        minCity = None
    if maxCity == "":
        maxCity = None
    if minTheater == "":
        minTheater = None
    if maxTheater == "":
        maxTheater = None
    if minEmployee == "":
        minEmployee = None
    if maxEmployee == "":
        maxEmployee = None
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_filter_company', [comName, minCity, maxCity, minTheater, maxTheater,
                                              minEmployee, maxEmployee, sortBy, sortDirection])
        cur.execute('''SELECT * FROM AdFilterCom''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)


# screen14
@backend_api.route('/obtainCompany')
def obtain_company():
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.execute('''SELECT DISTINCT comName FROM Company''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen15
@backend_api.route('/obtainManager')
def obtain_manager():
    company = request.args.get('Company')
    conn = db.connect()
    cur = conn.cursor()
    ex = conn.cursor()
    try:
        cur.execute('''SELECT DISTINCT username FROM Manager WHERE comName = "%s"'''%company)
        conn.commit()
        row_headers1 = [x[0] for x in cur.description]
        result1 = cur.fetchall()

        ex.execute('''SELECT DISTINCT manUsername FROM Theater WHERE comName = "%s"''' % company)
        conn.commit()
        # row_headers2 = [x[0] for x in ex.description]
        result2 = ex.fetchall()
        result2 = set(result2)
        json_data = []
        for row in result1:
            if row not in result2:
                json_data.append(dict(zip(row_headers1, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen15
@backend_api.route('/createTh')
def create_th():
    Name = request.args.get('Name')
    Company = request.args.get('Company')
    Street_Address = request.args.get('Street_Address')
    City = request.args.get('City')
    Manager = request.args.get('Manager')
    State = request.args.get('State')
    Zipcode = request.args.get('Zipcode')
    Capacity = request.args.get('Capacity')

    if Name is None or Company is None or Street_Address is None or City is None or Manager is None or State is None or Zipcode is None or Capacity is None:
        return Response(status=500)
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_create_theater', [Name, Company, Street_Address, City, Manager, State, Zipcode, Capacity])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return Response(status=200)

# screen16
@backend_api.route('/obtainEmployee')
def obtain_employee():
    CompanyName = request.args.get('CompanyName')
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_view_comDetail_emp', [CompanyName])
        cur.execute('''SELECT * FROM AdComDetailEmp''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen16
@backend_api.route('/obtainTheater')
def obtain_theater():
    CompanyName = request.args.get('CompanyName')
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('admin_view_comDetail_th', [CompanyName])
        cur.execute('''SELECT * FROM AdComDetailTh''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen17
@backend_api.route('/AdminCreateMovie')
def create_movie():
    Name = request.args.get('Name')
    Duration = request.args.get('Duration')
    ReleaseDate = request.args.get('ReleaseDate')


    ReleaseDate = parse_date(ReleaseDate)

    if Name is None or Duration is None or ReleaseDate is None:
            return Response(status=500)
    conn = db.connect()
    cur = conn.cursor()

    try:
        cur.callproc('admin_create_mov', [Name, ReleaseDate, Duration])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return Response(status=200)



# screen18
@backend_api.route('/ManagerFilterTheater')
def filter_theater():
    movName = request.args.get('movName')
    minMovDuration = request.args.get('minMovDuration')
    maxMovDuration = request.args.get('maxMovDuration')
    minMovReleaseDate = request.args.get('minMovReleaseDate')
    maxMovReleaseDate = request.args.get('maxMovReleaseDate')
    minMovPlayDate = request.args.get('minMovPlayDate')
    maxMovPlayDate = request.args.get('maxMovPlayDate')
    includedNotPlay = request.args.get('includedNotPlay')
    conn = db.connect()
    cur = conn.cursor()

    if minMovDuration == '':
        minMovDuration = None
    if maxMovDuration == '':
        maxMovDuration = None
    if minMovReleaseDate == '':
        minMovReleaseDate = None
    else:
        minMovReleaseDate = parse_date(minMovReleaseDate)
    if maxMovReleaseDate == '':
        maxMovReleaseDate = None
    else:
        maxMovReleaseDate = parse_date(maxMovReleaseDate)
    if minMovPlayDate == '':
        minMovPlayDate = None
    else:
        minMovPlayDate = parse_date(minMovPlayDate)
    if maxMovPlayDate == '':
        maxMovPlayDate = None
    else:
        maxMovPlayDate = parse_date(maxMovPlayDate)
    if includedNotPlay == 'false':
        includedNotPlay = False
    else:
        includedNotPlay = True
    try:
        cur.callproc('manager_filter_th', [movName, USERNAME, minMovDuration, maxMovDuration, minMovReleaseDate, maxMovReleaseDate, minMovPlayDate, maxMovPlayDate, includedNotPlay])
        cur.execute('''SELECT * FROM ManFilterTh''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data, default=myconverter)

# screen19
@backend_api.route('/ManagerScheduleMovie')
def add_movie():
    Name = request.args.get('Name')
    ReleaseDate = request.args.get('ReleaseDate')
    PlayDate = request.args.get('PlayDate')


    ReleaseDate = parse_date(ReleaseDate)
    PlayDate = parse_date(PlayDate)


    if Name is None or PlayDate is None or ReleaseDate is None:
            return Response(status=500)
    conn = db.connect()
    cur = conn.cursor()

    try:
        cur.callproc('manager_schedule_mov', [USERNAME, Name, ReleaseDate, PlayDate])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return Response(status=200)

# screen20
@backend_api.route('/filterMovie')
def filter_movie():
    comName = request.args.get('comName')
    movName = request.args.get('movName')
    thCity = request.args.get('thCity')
    thState = request.args.get('thState')
    moviePlayStartDate = request.args.get('moviePlayStartDate')
    moviePlayEndDate = request.args.get('moviePlayEndDate')
    conn = db.connect()
    cur = conn.cursor()

    if moviePlayStartDate == '':
        moviePlayStartDate = None
    else:
        moviePlayStartDate = parse_date(moviePlayStartDate)
    if moviePlayEndDate == '':
        moviePlayEndDate = None
    else:
        moviePlayEndDate = parse_date(moviePlayEndDate)

    try:
        cur.callproc('customer_filter_mov', [movName, comName, thCity, thState, moviePlayStartDate, moviePlayEndDate])
        cur.execute('''SELECT * FROM CosFilterMovie''')
        conn.commit()
        header = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(header, row)))

    except Exception as e:
        print('excep')
        return Response(status=500)
    finally:
        cur.close()

    new_data = parse_address(json_data)

    return json.dumps(new_data, default=myconverter)

# screen20
def myconverter(o):
    if isinstance(o, datetime.date):
        return o.__str__()

# screen20
@backend_api.route('/getAllMovie')
def get_all_movie():
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.execute('''SELECT DISTINCT movName FROM Movie''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen20
@backend_api.route('/getAllTheaterState')
def get_all_theather_state():
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.execute('''SELECT DISTINCT thState FROM Theater''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen20
@backend_api.route('/getUserCardNum')
def get_user_cardNum():
    conn = db.connect()
    cur = conn.cursor()
    try:
        query = "SELECT DISTINCT creditCardNum FROM CreditCard WHERE username = (%s) "
        cur.execute(query, USERNAME)
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen20
@backend_api.route('/customerViewMov')
def customer_view_mov():
    creditCardNum = request.args.get('creditCardNum')
    movName = request.args.get('movName')
    comName = request.args.get('comName')
    thName = request.args.get('thName')
    movReleaseDate = request.args.get('movReleaseDate')
    movPlayDate = request.args.get('movPlayDate')

    if creditCardNum == '':
        return 'Nothing'
    if movReleaseDate == '':
        movReleaseDate = None

    if movPlayDate == '':
        movPlayDate = None
    print([creditCardNum, movName, movReleaseDate, thName, comName, movPlayDate])
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('customer_view_mov', [creditCardNum, movName, movReleaseDate, thName, comName, movPlayDate])
        conn.commit()
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return 'Nothing'

# screen20
@backend_api.route('/getCustomerViewHistory')
def get_customer_view_history():
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('customer_view_history', [USERNAME])
        cur.execute('''SELECT * FROM CosViewHistory''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data, default=myconverter)

# screen21
@backend_api.route('/getAllTheater')
def get_all_theather():
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.execute('''SELECT DISTINCT thName FROM Theater''')
        conn.commit()
        row_headers = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(row_headers, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    return json.dumps(json_data)

# screen21
@backend_api.route('/userFilerTheater')
def user_filer_theater():
    comName = request.args.get('comName')
    thName = request.args.get('thName')
    thCity = request.args.get('thCity')
    thState = request.args.get('thState')

    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('user_filter_th', [thName, comName, thCity, thState])
        cur.execute('''SELECT * FROM UserFilterTh''')
        conn.commit()
        header = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(header, row)))

    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()

    new_data = parse_address(json_data)

    return json.dumps(new_data, default=myconverter)

# screen21
@backend_api.route('/userVisitTheater')
def user_visit_theater():
    thName = request.args.get('thName')
    comName = request.args.get('comName')
    visitDate = request.args.get('visitDate')
    if visitDate == '':
        return None
    visitDate = visitDate.split()
    monthMap = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    }
    tmp = []
    tmp.append(visitDate[3])
    tmp.append(monthMap[visitDate[1]])
    tmp.append(visitDate[2])
    parseVisitDate = '-'.join(tmp)
    # print([thName, comName, parseVisitDate, USERNAME])
    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('user_visit_th', [thName, comName, parseVisitDate, USERNAME])
        conn.commit()
    except Exception as e:
        print('exc')
        return Response(status=500)
    finally:
        cur.close()
    return 'nothing'

# screen21
@backend_api.route('/userFilterVisitHistory')
def user_filer_visit_history():
    comName = request.args.get('comName')
    visitStartDate = request.args.get('visitStartDate')
    visitEndDate = request.args.get('visitEndDate')
    print(visitStartDate)
    if visitStartDate == '':
        visitStartDate = None
    else:
        visitStartDate = parse_date(visitStartDate)
    if visitEndDate == '':
        visitEndDate = None
    else:
        visitEndDate = parse_date(visitEndDate)

    conn = db.connect()
    cur = conn.cursor()
    try:
        cur.callproc('user_filter_visitHistory', [USERNAME, comName, visitStartDate, visitEndDate])
        cur.execute('''SELECT * FROM UserVisitHistory''')
        conn.commit()
        header = [x[0] for x in cur.description]
        result = cur.fetchall()
        json_data = []
        for row in result:
            json_data.append(dict(zip(header, row)))
    except Exception as e:
        return Response(status=500)
    finally:
        cur.close()
    # print(json_data)

    new_data = parse_address(json_data)

    return json.dumps(new_data, default=myconverter)

# screen21
def parse_date(date):
    date = date.split()
    monthMap = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    }
    tmp = []
    tmp.append(date[3])
    tmp.append(monthMap[date[1]])
    tmp.append(date[2])
    parseVisitDate = '-'.join(tmp)
    return parseVisitDate

# screen21
def parse_address(json_data):
    new_data = []
    for row in json_data:
        tmp = {}
        tmp['Address'] = row['thStreet'] + ', ' + row['thCity'] + ', ' + row['thState'] + ' ' + row['thZipcode']
        for key in row:
            if key == 'thStreet' or key == 'thCity' or key == 'thState' or key == 'thZipcode':
                continue
            tmp[key] = row[key]
        new_data.append(tmp)
    return new_data
