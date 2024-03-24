
install:
	@echo '************                               ************'
	@echo '************       Install packages        ************'
	@echo '************                               ************'
	pnpm install

up:
	@echo '************                               ************'
	@echo '************        UP CONTAINERS          ************'
	@echo '************                               ************'
	docker compose up -d

down:
	@echo '************                               ************'
	@echo '************        DOWN CONTAINERS        ************'
	@echo '************                               ************'
	docker compose down

stop:
	@echo '************                               ************'
	@echo '************        STOP CONTAINERS        ************'
	@echo '************                               ************'
	docker compose stop

dev:
	@echo '************                               ************'
	@echo '************        DEV INIT     	      ************'
	@echo '************                               ************'
	STAGE=dev docker compose up --build -d

prod:
	@echo '************                               ************'
	@echo '************        PROD INIT    	      ************'
	@echo '************                               ************'
	STAGE=prod docker compose up --build -d

build_prod:
	@echo '************                               ************'
	@echo '************        PROD BUILD    	      ************'
	@echo '************                               ************'
	STAGE=prod docker compose build

dev_sql:
	@echo '************                               ************'
	@echo '************        DEV SQL INIT  	      ************'
	@echo '************                               ************'
	STAGE=dev docker compose -f docker-compose.yml -f docker-compose.sql.yml up --build -d

exec:
	@echo '************                               ************'
	@echo '************       Exec Bash NODE          ************'
	@echo '************                               ************'
	docker compose exec node bash

sh:
	@echo '************                               ************'
	@echo '************        Exec SH NODE    	      ************'
	@echo '************                               ************'
	docker compose exec node sh

test:
	@echo '************                               ************'
	@echo '************        Exec NODE TEST         ************'
	@echo '************                               ************'
	docker compose exec node pnpm test

stress:
	@echo '************                               ************'
	@echo '************        STRESS TEST            ************'
	@echo '************                               ************'
	artillery run artillery.yml

init:
	@echo '************                               ************'
	@echo '************           Init NODE    	      ************'
	@echo '************                               ************'
	docker compose exec node sh tools/dev.init.sh

clean:
	docker compose down -v --remove-orphans
	docker ps -a | grep _run_ | awk '{print $$1}' | xargs -I {} docker rm {}
