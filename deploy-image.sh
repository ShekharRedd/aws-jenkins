# HOST='192.168.1.214'
HOST="$1"
PORT=3306


docker network create my-deploy

## mysql deploy
docker run  -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=sample_user -e MYSQL_USER=shekhar1 -e MYSQL_PASSWORD=shekhar@143 -e MYSQL_ROOT_HOST=$HOST -e MYSQL_HOST=$HOST --name my --net my-deploy mysql


# checking the port 3306 is fully configure
while true; do
    docker exec my mysqladmin --user=shekhar1 --password='shekhar@143' --host=$HOSt --port=3306 ping 
    exit_code=$?
    echo "$exit_code"
    if [ $exit_code -eq 0 ]; then
        echo "Port $PORT is open. Proceeding with the next step."
        break
    else
        echo "Port $PORT is closed. Retrying in 5 seconds..."
        docker logs my 
        sleep 2 
    fi
done

echo "Successfully run the my sql "

## running the python container
docker run -d -p 5003:5003 -e HOST=$HOST --name py --net my-deploy aws-python
PORT=5003

while true; do
    # Run Python code to check if the port is open
    python -c "import socket; sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM); result = sock.connect_ex(('${HOST}', ${PORT})); exit(result)"
    exit_code=$?
    if [ $exit_code -eq 0 ]; then
        echo "Port $PORT is open. Proceeding with the next step."
        # deploy react image 
        docker run -d -p 3000:3000  -e REACT_APP_API_URL=$HOST --name ry --net my-deploy my-react
        break
    else
        echo "Port $PORT is closed. Retrying in 5 seconds..."
        sleep 2
    fi
done

docker ps 
sleep 5

