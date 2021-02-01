
down:
	@echo '************                               ************'
	@echo '************           DOWN CONTAINERS     ************'
	@echo '************                               ************'
	docker-compose down

dev:
	@echo '************                               ************'
	@echo '************           DEV INIT    	      ************'
	@echo '************                               ************'
	docker-compose up --build -d

dev_sql:
	@echo '************                               ************'
	@echo '************           DEV INIT    	      ************'
	@echo '************                               ************'
	docker-compose -f docker-compose.yml -f docker-compose.sql.yml up --build -d

exec:
	@echo '************                               ************'
	@echo '************           Exec NODE    	      ************'
	@echo '************                               ************'
	docker-compose exec node bash

init:
	@echo '************                               ************'
	@echo '************           Init NODE    	      ************'
	@echo '************                               ************'
	docker-compose exec node bash dev.init.sh

clean:
	docker-compose down -v --remove-orphans
	docker ps -a | grep _run_ | awk '{print $$1}' | xargs -I {} docker rm {}
