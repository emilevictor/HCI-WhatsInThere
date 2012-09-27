from mod_python import apache
import random
import simplejson
import processMapURL as m
import sqlite3

def getRoom(req,btaddr=None):
	req.content_type="application/json ;charset=UTF8 "
	req.send_http_header()
	buld = random.randint(1,100)
	room = random.randint(1,8)*100 + random.randint(1,50)
	req.write("{'buld': %s,'room': %s}"%(buld, room))

def getImage(req,buld=1):
	req.content_type="image/png"
	req.send_http_header()
	return m.getBuldImage(buld)


def getClasses(req,buld=None,room=None):
	req.content_type="application/json"
	req.send_http_header()
	if buld is None or room is None:
		return "classypengins = null;"
	conn = sqlite3.connect('rota.db')
	c = conn.cursor()
	c.execute('''SELECT session, start, stop FROM class WHERE building=? AND room=?''',(buld,room))
	res = fetchall()
	
	return "null"
