#!/bin/bash

git add src/*

bash tools/helper.sh
bash tools/deleted.sh
bash tools/add_newfile_detect.sh
bash tools/modified_file.sh

yarn lint

bash tools/compile_files.sh

yarn start
