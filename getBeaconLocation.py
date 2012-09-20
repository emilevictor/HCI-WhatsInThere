from mod_python import apache
import random
import simplejson

class room():
	room = None
	buld = None

def handler(req):
	req.content_type="application/json"
	req.send_http_header()
	a = room()
	a.buld = random.randint(1,100)
	a.room = random.randint(1,8)*100 + random.randint(1,50)
	req.write("'{'buld':%s,'room':%s}'"%(a.buld, a.room))
	return apache.OK
