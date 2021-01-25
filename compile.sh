#!/bin/bash

git add src/*

bash tools/deleted_detected.sh
bash tools/execute_detected_files.sh
bash tools/add_newfile_detect.sh
#bash tools/deleted_file_detect.sh
#bash tools/modifiedfile.sh

bash compile_files.sh

yarn lint
yarn start
