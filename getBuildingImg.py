from mod_python import apache
import processMapURL as a

def handler(req):
	req.content_type="image/png"
	req.send_http_header()
	req.sendfile(a.getImage(a.getZoomedPage(a.findBuildingMapPage(1))))
	return apache.OK
