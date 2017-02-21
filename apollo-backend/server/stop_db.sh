DOD=`docker ps -aqf "name=apollo-mysql"`
docker stop $DOD
docker rm $DOD
