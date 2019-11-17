# Загрузить историю

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.add", "params": {"video": "kFXKzqqm.mp4"}, "token": "TOKEN"}' http://127.0.0.1:5000/

# Список историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.get"}' http://127.0.0.1:5000/

# Список не моих историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.get", "token": "TOKEN"}' http://127.0.0.1:5000/

# Список моих историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.get", "params": {"my": true}, "token": "TOKEN"}' http://127.0.0.1:5000/

# Удаление историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.delete", "params": {"id": 1}, "token": "TOKEN"}' http://127.0.0.1:5000/