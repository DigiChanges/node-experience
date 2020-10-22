mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
mkfile_dir := $(dir $(mkfile_path))

test: test_node_experience

test_node_experience: build_test run_test run_test_clean

build_test:
	@echo '************                               ************'
	@echo '************          BUILD TEST			  ************'
	@echo '************                               ************'
	docker-compose -f docker-compose.test.yml build
	docker run --volume $(mkfile_dir):/usr/app --rm node-experience_node yarn
	docker run --volume $(mkfile_dir):/usr/app --rm node-experience_node yarn build
	docker-compose -f docker-compose.test.yml up -d

run_test:
	@echo '************                               ************'
	@echo '************          RUN TEST             ************'
	@echo '************                               ************'
	sleep 4
	docker exec experience_test_node_1 yarn test

run_test_clean:
	@echo '************                               ************'
	@echo '************           CLEAN TEST	      ************'
	@echo '************                               ************'
	docker stop experience_test_db_1
	docker stop experience_test_node_1
	docker stop experience_test_mail_1
	docker rm --force -v experience_test_db_1
	docker rm --force -v experience_test_node_1
	docker rm --force -v experience_test_mail_1

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
