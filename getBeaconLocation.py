from mod_python import apache
import random
import simplejson
import processMapURL as m
import sqlite3
import datetime
import os
import logging
import re

#path = '/home/michael/HCI-WhatsInThere/generateDatasource'
path = os.path.dirname(__file__)
offset = datetime.timedelta(days=0)

def getRoom(req,btaddr=None):
	req.content_type="application/json" # ;charset=UTF8 "
	req.send_http_header()
	conn = sqlite3.connect(path +'/rota.db')
	c = conn.cursor()
	c.execute('''SELECT building, room, session FROM class WHERE start > ? AND start < ?''',(
		datetime.date.today() + offset,
		datetime.date.today() + offset + datetime.timedelta(days=1)
		))
	res = c.fetchall()
	
	index = random.randint(0,len(res)-1)
	result = {}
	result['buld'] = res[index][0]
	result['room'] = int(re.sub("/[0-9]*","",re.sub("[a-zA-Z]","",res[index][1])))
	result['fullroom']=res[index][1]

	c.execute('''SELECT offering FROM classCourse WHERE session=?''',(res[index][2],))
	offer = c.fetchall()
	c.execute('''SELECT course FROM courses WHERE offering=?''',(offer[0][0],))
	cname = c.fetchall()
	result['class']=cname[0][0]
	return simplejson.dumps(result)

def getImage(req,buld=1):
	req.content_type="image/png"
	req.send_http_header()
	return m.getBuldImage(buld)


def getClasses(req,buld=None,room=None):
	req.content_type="application/json"
	req.send_http_header()
	if buld is None or room is None:
		return "classypengins = null;"
	buld = re.sub("^[0 ]+","",buld)
	room = re.sub("^[0 ]+","",room)
	conn = sqlite3.connect(path+'/rota.db')
	c = conn.cursor()
	c.execute('''SELECT session, start, stop FROM class WHERE building=? AND room=? AND start > ? AND start < ?''',(
		buld,
		room,
		datetime.date.today() + offset,
		datetime.date.today() + offset + datetime.timedelta(days=1)
		))
	res = c.fetchall()
	sessions = []
	for r in res:
		apache.log_error(repr(r),apache.APLOG_DEBUG)
		c.execute('''SELECT offering FROM classCourse WHERE session=?''', (r[0],))
		offer = c.fetchall()
		c.execute('''SELECT course FROM courses WHERE offering=?''',
			(offer[0][0],))
		classname = c.fetchall()
		sessiondict={}
		sessiondict['class']=classname[0][0]
		sessiondict['start']=r[1]
		sessiondict['finish']=r[2]
		sessions.append(sessiondict)
	return simplejson.dumps(sessions)

def addTiming(req,test=None,time=None,success=None):
	req.content_type="application/json"
        req.send_http_header()
	if time is None or success is None or test is None:
		req.status = apache.HTTP_INTERNAL_SERVER_ERROR 
		raise apache.HTTP_SERVER_RETURN, apache.DONE
	conn = sqlite3.connect(path+'/timing.db')
	c = conn.cursor()
	if success=="true":
		c.execute('''INSERT INTO timing VALUES (?,?,?,?)''',(datetime.datetime.now(), int(test), int(time),True))
	else:
		c.execute('''INSERT INTO timing VALUES (?,?,?,?)''',(datetime.datetime.now(), int(test), int(time), False))
	conn.commit()
	c.close()
	return '{"status":"success"}'
		
