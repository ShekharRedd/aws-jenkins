pipeline{
    agent any
    stages{
        stage("Build react image"){
            steps{

                echo "========executing Build python Images========"
                sh "cd react && ls -l"
                withCredewithCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "docker build -t my-react:1.0 ."
                sh 'echo $USER'
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh "docker push $image/my-react:1.0"
                }
            }
            
            stage("Build python image"){
            steps{
                echo "========executing Build python Images========"
                sh "cd python && ls -l"
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "docker build -t my-python:1.0 ."
                sh 'echo $USER'
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh "docker push $image/my-python:1.0"
                }
            }
            stage("deploying into aws ec2 instance") {
                
                step {

                    echo "hello world "
                }
            }
}
}
