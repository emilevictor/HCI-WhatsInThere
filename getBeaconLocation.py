from mod_python import apache

def handler(req):
	req.content_type="text/html"
	req.send_http_header()
	req.write("Hello World!")
	return apache.OK
