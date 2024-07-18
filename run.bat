@echo off

rem

cd frontend
start cmd /k npm run dev

cd ../Backend

start cmd /k go run Auth.go