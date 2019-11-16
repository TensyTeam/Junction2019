import time

from mongodb import db
from api._error import ErrorWrong, ErrorUpload, ErrorAccess, ErrorInvalid
from api._func import check_params, next_id, get_preview, load_image


# Создание

def add(this, **x):
	# Проверка параметров

	check_params(x, (
		('video', True, str),
	))

	# Не авторизован

	if this.user['admin'] < 3:
		raise ErrorAccess('add')

	#

	query = {
		'id': next_id('stories'),
		'time': this.timestamp,
		'user': this.user['token'],
		'video': x['video'],
	}

	# Загрузка видео

	# if 'video' in x:
	# 	try:
	# 		file_type = x['file'].split('.')[-1]
		
	# 	# Неправильное расширение
	# 	except:
	# 		raise ErrorInvalid('file')

	# 	try:
	# 		load_image('app/static/tasks', x['video'], query['id'], file_type)

	# 	# Ошибка загрузки видео
	# 	except:
	# 		raise ErrorUpload('video')

	#######
	# video = request.files["file"]
	# print(video)

	#

	db['stories'].save(query)

	if '_id' in query:
		del query['_id']

	# Прикрепление задания к пользователю

	this.user['stories'].append(query['id'])
	db['users'].save(this.user)

	# Обновление списка историй

	this.socketio.emit('story_add', [query], namespace='/main')

	# Ответ

	res = {
		'id': query['id'],
	}

	return res

# Получение

def get(this, **x):
	# Проверка параметров

	check_params(x, (
		('id', False, (int, list, tuple), int),
		('my', False, bool),
		('count', False, int),
	))

	# Мои истории

	if 'my' not in x:
		x['my'] = False

	if x['my'] and this.user['admin'] < 3:
		raise ErrorAccess('token')

	# Условия

	count = x['count'] if 'count' in x else None

	db_condition = dict()

	if 'id' in x:
		if type(x['id']) == int:
			db_condition['id'] = x['id']

		else:
			db_condition['id'] = {'$in': x['id']}

	else:
		if x['my']:
			db_condition['id'] = {'$in': this.user['stories']}

	#

	db_filter = {
		'_id': False,
	}

	stories = [i for i in db['stories'].find(db_condition, db_filter) if i]

	# Выборка

	ind = 0
	while ind < len(stories):
		# Только чужие

		if not x['my'] and stories[ind]['user'] == this.user['token']:
			del stories[ind]
			continue

		# Онлайн пользователи

		db_filter = {
			'_id': False,
			'online': True,
		}

		user = db['users'].find_one({'token': stories[ind]['user']}, db_filter)

		stories[ind]['online'] = user['online']

		ind += 1

	# Количество

	stories = stories[:count]

	# Изображение

	for i in range(len(stories)):
		stories[i]['video'] = this.server['link'] + 'static/stories/' + stories[i]['video']
	
	# Ответ

	res = {
		'stories': stories,
	}

	return res

# Удаление

def delete(this, **x):
	# Проверка параметров

	check_params(x, (
		('id', True, int),
	))

	#

	story = db['stories'].find_one({'id': x['id']})

	if this.user['admin'] < 3 or story['token'] != this.user['token']:
		raise ErrorAccess('token')

	db['stories'].delete_one(story)