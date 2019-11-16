# Список историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.get"}' http://127.0.0.1:5000/

# Список моих историй

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.get", "params": {"my": true}, "token": "TOKEN"}' http://127.0.0.1:5000/

# Загрузить историю

# curl -F "video=@test.mp4" http://127.0.0.1:5000/

# curl -i -H "Content-Type: application/mp4" --data "test.mp4" -v -X POST http://127.0.0.1:5000/

curl -X POST -H "Content-Type: application/json" -d '{"method": "stories.add", "params": {"video": "kFXKzqqm.mp4"}, "token": "TOKEN"}' http://127.0.0.1:5000/