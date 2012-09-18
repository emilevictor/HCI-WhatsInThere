from mod_python import apache
import random

def handler(req):
	req.content_type="application/json"
	req.send_http_header()
	buld = random.randint(1,100)
	room = rand.randint(1,8)*100 + rand.randint(1,50)
	req.write('{ "room" : ' +repr(room) + ', "building": '+repr(buld) +'}')
	return apache.OK
