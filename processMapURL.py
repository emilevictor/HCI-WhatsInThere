#!/usr/bin/env python
import urllib2
import re
import StringIO
import httplib
import urllib

def findBuildingMapPage(number):
	n = urllib2.urlopen("http://www.uq.edu.au/maps/mapindex.html?alpha=ALL&menu=1")
	m = re.findall('<a class="mapindex-links" href="[^"\n]*">[^<\n]*</a>[^<\n]*<br />',n.read())

	result ={}
	for i in m:
		rematch = re.findall('index\.html[^"]*|[0-9]*[A-Z]*<br />',i)
		result[rematch[1].strip("<br />")] = rematch[0]
	return result[number]

def getZoomedPage(url):
	n = urllib2.urlopen("http://www.uq.edu.au/maps/"+url)
	return re.findall('index\.html[^"]*',re.findall("Zoom level:[^+]*\+</a>",n.read())[0])[4]

def getImage(url):
	n = urllib2.urlopen("http://www.uq.edu.au/maps/"+url)
	imgurl = re.findall('c_mapmake\.html[^"]*',n.read())[0]
	img = httplib.HTTPConnection("www.uq.edu.au")
	img.request("GET","/maps/"+imgurl.replace(" ","%20"))
	res = img.getresponse()
	return res.read()


def getBuldImage(building):
	return getImage(getZoomedPage(findBuildingMapPage(building)))
