from app import app, sio

import time

from mongodb import db

# Socket.IO

from threading import Lock
from flask_socketio import emit

thread = None
thread_lock = Lock()


# Отправить реакцию

@sio.on('reaction_now', namespace='/main')
def reaction(x):
	db_filter = {'_id': False, 'user': True}
	story = db['stories'].find_one({'id': x['id']}, db_filter)

	if not story:
		return
	
	sio.emit('reaction_now', {
		'id': x['id'],
		'user': story['user'],
		'reaction': x['reaction'],
	}, namespace='/main')

# Онлайн пользователи

@sio.on('online', namespace='/main')
def online(x):
	global thread
	with thread_lock:
		if thread is None:
			thread = sio.start_background_task(target=background_thread)

	user = db['users'].find_one({'token': x['token']})

	if user:
		user['online'] = True
		user['last'] = time.time()
		db['users'].save(user)


if __name__ == '__main__':
	sio.run(app)


def background_thread():
	while True:
		timestamp = time.time()

		# Вышел из онлайна

		db_condition = {
			'last': {'$lt': timestamp - 10},
			'online': True,
		}

		for user in db['users'].find(db_condition):
			user['online'] = False
			db['users'].save(user)

		#

		time.sleep(5)