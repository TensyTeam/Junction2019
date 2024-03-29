from flask import request, jsonify
from app import app, sio, SERVER
from werkzeug.utils import secure_filename

import string
import random

from api import API, Error


@app.route('/', methods=['POST'])
def index():
	x = request.json

	#  Не указан метод API

	if 'method' not in x:
		return jsonify({'error': 2, 'result': 'Wrong method'})

	# #  Не указаны параметры API

	# if 'params' not in x:
	# 	return jsonify({'error': 3, 'message': 'Wrong params'})

	#

	api = API(
		server=SERVER,
		socketio=sio,
		token=x['token'] if 'token' in x else None,
	)

	req = {}

	try:
		res = api.method(x['method'], x['params'] if 'params' in x else {})

	# HTTP Codes ?

	except Error.ErrorSpecified as e:
		req['error'] = 4
		req['result'] = str(e)

	except Error.ErrorBusy as e:
		req['error'] = 5
		req['result'] = str(e)

	except Error.ErrorInvalid as e:
		req['error'] = 6
		req['result'] = str(e)

	except Error.ErrorWrong as e:
		req['error'] = 7
		req['result'] = str(e)

	except Error.ErrorUpload as e:
		req['error'] = 8
		req['result'] = str(e)

	except Error.ErrorAccess as e:
		req['error'] = 9
		req['result'] = str(e)

	except Error.ErrorType as e:
		req['error'] = 13
		req['result'] = str(e)

	# except Exception as e:
	# 	req['error'] = 1
	# 	req['result'] = 'Server error'

	else:
		req['error'] = 0

		if res:
			req['result'] = res

	return jsonify(req)

@app.route('/upload', methods=['POST'])
def upload():
	# Рандомное имя

	ALL_SYMBOLS = string.ascii_letters
	generate = lambda length=8: ''.join(random.choice(ALL_SYMBOLS) for _ in range(length))

	# Сохранить

	file = request.files['file']

	name = generate() + '.' + secure_filename(file.filename).split('.')[-1]

	file.save('app/static/stories/{}'.format(name))

	# Вывод

	res = {
		'name': name,
	}

	return res