up:
	@echo '************                               ************'
	@echo '************           UP CONTAINERS       ************'
	@echo '************                               ************'
	docker-compose up -d

down:
	@echo '************                               ************'
	@echo '************           DOWN CONTAINERS     ************'
	@echo '************                               ************'
	docker-compose down

stop:
	@echo '************                               ************'
	@echo '************           STOP CONTAINERS     ************'
	@echo '************                               ************'
	docker-compose stop

dev:
	@echo '************                               ************'
	@echo '************           DEV INIT    	      ************'
	@echo '************                               ************'
	docker-compose up --build -d

debug:
	@echo '************                               ************'
	@echo '************           DEV DEBUG INIT 	  ************'
	@echo '************                               ************'
	docker-compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d

prod:
	@echo '************                               ************'
	@echo '************           PROD INIT    	      ************'
	@echo '************                               ************'
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

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

sh:
	@echo '************                               ************'
	@echo '************           Exec NODE    	      ************'
	@echo '************                               ************'
	docker-compose exec node sh

test:
	@echo '************                               ************'
	@echo '************           Exec NODE TEST      ************'
	@echo '************                               ************'
	docker-compose exec node yarn test

ts_check:
	@echo '************                               ************'
	@echo '************       Exec NODE TS CHECK      ************'
	@echo '************                               ************'
	docker-compose exec node yarn ts-check

init:
	@echo '************                               ************'
	@echo '************           Init NODE    	      ************'
	@echo '************                               ************'
	docker-compose exec node sh dev.init.sh

clean:
	docker-compose down -v --remove-orphans
	docker ps -a | grep _run_ | awk '{print $$1}' | xargs -I {} docker rm {}
